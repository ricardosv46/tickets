import { computed, inject, Injectable, signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { catchError, debounceTime, distinctUntilChanged, of, switchMap, tap } from "rxjs";
import { Ticket, TicketStatus } from "./ticket.model";
import { TicketsApiService } from "./tickets-api";

export type Filter = 'all' | TicketStatus;

@Injectable({ providedIn: 'root' })
export class TicketsService {

    private readonly api = inject(TicketsApiService);

    private readonly _term = signal('');
    private readonly _filter = signal<Filter>('all');
    // false hasta que llega la primera respuesta de la API (para mostrar "Cargando...").
    private readonly _loaded = signal(false);

    readonly loaded = this._loaded.asReadonly();
    readonly term = this._term.asReadonly();
    readonly filter = this._filter.asReadonly();

    // Única fuente de datos: la API. Cada texto de búsqueda (con debounce) pide la lista;
    // switchMap cancela la petición anterior. El texto vacío trae todos los tickets.
    readonly tickets = toSignal(
        toObservable(this._term).pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(term => this.api.search(term).pipe(
                catchError(() => of([] as Ticket[])),
                tap(() => this._loaded.set(true)),
            )),
        ),
        { initialValue: [] as Ticket[] },
    );

    readonly counts = computed(() =>
        this.tickets().reduce((acc, ticket) => {
            acc[ticket.status] = acc[ticket.status] + 1;
            return acc;
        }, { open: 0, in_progress: 0, resolved: 0, closed: 0 })
    );

    readonly filteredTickets = computed(() =>
        this.tickets().filter(ticket => this._filter() === 'all' || ticket.status === this._filter())
    );

    readonly setTerm = (term: string) => {
        this._term.set(term);
    };

    readonly setFilter = (filter: Filter) => {
        this._filter.set(filter);
    };
}
