import json
import os
import unicodedata

# Los datos viajan empaquetados junto con la Lambda (mismo zip).
_DATA_PATH = os.path.join(os.path.dirname(__file__), "tickets.json")
with open(_DATA_PATH, encoding="utf-8") as f:
    TICKETS = json.load(f)


def _normalize(text):
    """Minúsculas y sin tildes, para que 'sesion' encuentre 'sesión'."""
    decomposed = unicodedata.normalize("NFD", str(text).lower())
    return "".join(c for c in decomposed if unicodedata.category(c) != "Mn")


def _response(status, body):
    # CORS se configura en API Gateway (HTTP API), no aquí:
    # si lo ponemos en los dos lados, el navegador recibe cabeceras duplicadas.
    return {
        "statusCode": status,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(body, ensure_ascii=False),
    }


def _list_tickets(query):
    term = _normalize((query or {}).get("q", "")).strip()
    if not term:
        return _response(200, TICKETS)
    found = [
        t for t in TICKETS
        if any(term in _normalize(value) for value in t.values())
    ]
    return _response(200, found)


def _get_ticket(ticket_id):
    try:
        wanted = int(ticket_id)
    except (TypeError, ValueError):
        return _response(400, {"message": "El id debe ser un número"})
    for t in TICKETS:
        if t["id"] == wanted:
            return _response(200, t)
    return _response(404, {"message": "Ticket no encontrado"})


def lambda_handler(event, context):
    # Formato 2.0 del HTTP API: routeKey llega como "GET /tickets/{id}".
    route = event.get("routeKey", "")
    print(f"route={route} query={event.get('queryStringParameters')}")  # va a CloudWatch

    if route == "GET /tickets":
        return _list_tickets(event.get("queryStringParameters"))
    if route == "GET /tickets/{id}":
        return _get_ticket((event.get("pathParameters") or {}).get("id"))
    return _response(404, {"message": "Ruta no encontrada"})
