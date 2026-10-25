// Producción (ng build). Si más adelante la API va detrás de CloudFront (Paso 31b),
// cambiar apiUrl a '/api'. Al desplegar, agregar la URL de CloudFront a las
// callback/sign-out URLs del app client de Cognito.
export const environment = {
  apiUrl: 'https://hw564ode7e.execute-api.us-east-1.amazonaws.com',
  auth: {
    // Issuer del JWT: https://cognito-idp.<región>.amazonaws.com/<userPoolId>
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_g1F1YHASW',
    clientId: '2b5qihte6rsd328qmvncffgqpf', // no es secreto: la SPA usa PKCE
    // Dominio de la pantalla de login (Cognito) y su endpoint de logout.
    hostedUiDomain: 'https://us-east-1g1f1yhasw.auth.us-east-1.amazoncognito.com',
  },
};
