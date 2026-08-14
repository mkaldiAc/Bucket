import { StrictMode } from 'react'; import { createRoot } from 'react-dom/client'; import App from './App'; import './styles.css'; import { authService } from './services/authService';
await authService.initialize();
createRoot(document.getElementById('root')!).render(<StrictMode><App/></StrictMode>);
