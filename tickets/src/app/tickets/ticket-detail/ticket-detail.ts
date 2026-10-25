import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";
import { switchMap } from "rxjs";
import { TicketsApiService } from "../tickets-api";

@Component({
    selector: 'app-ticket-detail',
    templateUrl: './ticket-detail.html',
    imports: [DatePipe, RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketDetailComponent {
    readonly id = input.required<string>();
    private readonly api = inject(TicketsApiService);

    // undefined = cargando, null = no existe, Ticket = encontrado
    readonly ticket = toSignal(
        toObservable(this.id).pipe(
            switchMap(id => this.api.getById(Number(id))),
        ),
    );
}
