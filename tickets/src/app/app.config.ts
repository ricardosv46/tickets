import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { LogLevel, OidcSecurityService, provideAuth } from 'angular-auth-oidc-client';
import { catchError, firstValueFrom, of } from 'rxjs';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAuth({
      config: {
        authority: environment.auth.authority,
        clientId: environment.auth.clientId,
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        scope: 'openid email profile',
        responseType: 'code', // Authorization Code; la librería usa PKCE
        useRefreshToken: true,
        silentRenew: true,
        renewTimeBeforeTokenExpiresInSeconds: 30,
        // Cognito entrega refresh token sin el scope "offline_access": silencia el aviso.
        disableRefreshTokenOfflineAccessScopeWarning: true,
        logLevel: LogLevel.Warn,
      },
    }),
    // Al arrancar procesa el "code" que Cognito devuelve en la URL (checkAuth).
    // Si falla (por ejemplo, una URL de retorno vieja con un "state" ya usado), NO se
    // aborta el arranque: se limpia la URL y la app inicia sin sesión; el guard pedirá login.
    provideAppInitializer(() => {
      const oidc = inject(OidcSecurityService);
      return firstValueFrom(
        oidc.checkAuth().pipe(
          catchError(() => {
            window.history.replaceState({}, '', window.location.pathname);
            return of(null);
          }),
        ),
      );
    }),
  ]
};
