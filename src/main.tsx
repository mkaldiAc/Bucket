import { StrictMode } from 'react'; import { createRoot } from 'react-dom/client'; import App from './App'; import './styles.css'; import { config } from './config'; import { authService } from './services/authService';
await authService.initialize();
if(!config.useMockData)await authService.ensureSignedIn();
createRoot(document.getElementById('root')!).render(<StrictMode><App/></StrictMode>);
