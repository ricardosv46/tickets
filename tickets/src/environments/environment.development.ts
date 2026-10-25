// Desarrollo (ng serve). Plan B sin AWS: apiUrl 'http://localhost:3000' con `npm run api`
// (pero el login con Cognito seguiría necesitando AWS).
export const environment = {
  apiUrl: 'https://hw564ode7e.execute-api.us-east-1.amazonaws.com',
  auth: {
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_g1F1YHASW',
    clientId: '2b5qihte6rsd328qmvncffgqpf',
    hostedUiDomain: 'https://us-east-1g1f1yhasw.auth.us-east-1.amazoncognito.com',
  },
};
