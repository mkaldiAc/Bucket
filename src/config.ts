export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  uiThemeBaseUrl: import.meta.env.VITE_UI_THEME_BASE_URL || '',
  useMockData: import.meta.env.VITE_USE_MOCK_DATA !== 'false',
  azure: { clientId: import.meta.env.VITE_AZURE_CLIENT_ID || '', tenantId: import.meta.env.VITE_AZURE_TENANT_ID || '', redirectUri: import.meta.env.VITE_AZURE_REDIRECT_URI || window.location.origin, apiScope: import.meta.env.VITE_API_SCOPE || '' },
};

/** Loads an independently hosted theme after the local, resilient fallback. */
export const loadRemoteTheme = (baseUrl: string) => {
  if (!baseUrl) return;
  const base = baseUrl.replace(/\/$/, '');
  ['tokens.css', 'shell.css', 'components.css'].forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${base}/theme/${file}`;
    link.dataset.aiguillonTheme = file;
    document.head.appendChild(link);
  });
};
