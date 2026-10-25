import { AuthOptions } from 'angular-auth-oidc-client';

// Redirige a Cognito REEMPLAZANDO la entrada actual del historial (replace en vez de href).
// Así, el botón Atrás desde el login no vuelve a la app para ser redirigido otra vez.
export const loginOptions: AuthOptions = {
  urlHandler: url => window.location.replace(url),
};
