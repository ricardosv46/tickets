import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { loginOptions } from './auth.options';

export const authGuard: CanActivateFn = () => {
  const oidc = inject(OidcSecurityService);

  if (oidc.authenticated().isAuthenticated) {
    return true;
  }

  oidc.authorize(undefined, loginOptions);
  return false;
};