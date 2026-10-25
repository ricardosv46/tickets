import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { catchError, Observable, of } from "rxjs";
import { Ticket } from "./ticket.model";


@Injectable({ providedIn: 'root' })
export class TicketsApiService {

    private readonly apiUrl = environment.apiUrl;
    private readonly http = inject(HttpClient);

    readonly search = (term: string): Observable<Ticket[]> => {
        return this.http.get<Ticket[]>(`${this.apiUrl}/tickets`, { params: { q: term } });
    };

    // null = el ticket no existe (404) o la petición falló
    readonly getById = (id: number): Observable<Ticket | null> => {
        return this.http.get<Ticket>(`${this.apiUrl}/tickets/${id}`).pipe(
            catchError(() => of(null)),
        );
    };

}
