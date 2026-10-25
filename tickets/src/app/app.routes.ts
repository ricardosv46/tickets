import { Routes } from '@angular/router';
import { TicketListComponent } from './tickets/ticket-list/ticket-list';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: TicketListComponent, canActivate: [authGuard] },
    { path: 'ticket/:id', canActivate: [authGuard], loadComponent: () => {
        return import('./tickets/ticket-detail/ticket-detail').then(m => m.TicketDetailComponent);
    },
},
];
