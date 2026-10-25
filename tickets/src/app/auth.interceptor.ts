import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { catchError, switchMap, throwError } from 'rxjs';
import { environment } from '../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const oidc = inject(OidcSecurityService);

  // El token solo viaja a nuestra API: nunca a otros servidores ni a Cognito.
  if (!req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  return oidc.getAccessToken().pipe(
    switchMap(token => {
      const authReq = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;
      return next(authReq);
    }),
    catchError((err: HttpErrorResponse) => {
      // Sesión inválida o vencida: se limpia la sesión local. El guard mandará al login.
      if (err.status === 401) oidc.logoffLocal();
      if (err.status >= 500) console.error('Error del servidor');
      return throwError(() => err);
    }),
  );
};
