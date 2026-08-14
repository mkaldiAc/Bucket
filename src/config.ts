export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  useMockData: import.meta.env.VITE_USE_MOCK_DATA !== 'false',
  azure: { clientId: import.meta.env.VITE_AZURE_CLIENT_ID || '', tenantId: import.meta.env.VITE_AZURE_TENANT_ID || '', redirectUri: import.meta.env.VITE_AZURE_REDIRECT_URI || window.location.origin, apiScope: import.meta.env.VITE_API_SCOPE || '' },
};
