import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly oidc = inject(OidcSecurityService);

  // Signals de la librería: se leen con paréntesis en la plantilla.
  readonly authenticated = this.oidc.authenticated;
  readonly userData = this.oidc.userData;

  // El login lo dispara el guard (auth.guard.ts) al entrar a cualquier ruta sin sesión.

  // Cognito no usa el logout estándar de OIDC: espera client_id y logout_uri.
  // Por eso se borra la sesión local y se redirige a mano a su endpoint /logout.
  logout() {
    this.oidc.logoffLocal();
    const { hostedUiDomain, clientId } = environment.auth;
    const logoutUri = encodeURIComponent(window.location.origin);
    window.location.href = `${hostedUiDomain}/logout?client_id=${clientId}&logout_uri=${logoutUri}`;
  }
}
