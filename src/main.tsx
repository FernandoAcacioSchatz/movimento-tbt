import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/App';
import { AuthProvider } from './hooks/useAuth';
import { ContentProvider } from './hooks/useContent';
import './styles/globals.css';
import './styles/site.css';
import './styles/history.css';
import './styles/admin.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>
          <App />
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
