import { StrictMode } from 'react'; import { createRoot } from 'react-dom/client'; import App from './App'; import './styles.css';
import '../ui-theme/Aiguillon_design/theme/tokens.css';
import '../ui-theme/Aiguillon_design/theme/shell.css';
import '../ui-theme/Aiguillon_design/theme/components.css'; import { config, loadRemoteTheme } from './config'; import { authService } from './services/authService';
loadRemoteTheme(config.uiThemeBaseUrl);
await authService.initialize();
if(!config.useMockData)await authService.ensureSignedIn();
createRoot(document.getElementById('root')!).render(<StrictMode><App/></StrictMode>);
