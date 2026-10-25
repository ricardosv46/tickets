import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { TicketsService, Filter } from "../ticket.service";

@Component({
    selector: 'app-ticket-list',
    templateUrl: './ticket-list.html',
    imports: [DatePipe, RouterLink, ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketListComponent {

    // --- Apuntes del Paso 9 (experimento de fuga de memoria) ---
    // constructor() {
    //     interval(1000).pipe(takeUntilDestroyed()).subscribe(n => console.log('tick lista', n));
    //   }
    // private readonly destroyRef = inject(DestroyRef);
    // prueba = ()=>{
    //     interval(1000).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(n => console.log('tick lista', n));
    // }
    // ------------------------------------------------------------

    private readonly ticketsService = inject(TicketsService);

    readonly searchControl = new FormControl('', { nonNullable: true });

    readonly loaded = this.ticketsService.loaded;
    readonly counts = this.ticketsService.counts;
    readonly filter = this.ticketsService.filter;
    readonly filteredTickets = this.ticketsService.filteredTickets;

    readonly options: Filter[] = ['all', 'open', 'in_progress', 'resolved', 'closed'];

    constructor() {
        // valueChanges es un flujo infinito: se corta al destruir el componente.
        this.searchControl.valueChanges
            .pipe(takeUntilDestroyed())
            .subscribe(text => this.ticketsService.setTerm(text));
    }

    setFilter(filter: Filter) {
        this.ticketsService.setFilter(filter);
    }
}
