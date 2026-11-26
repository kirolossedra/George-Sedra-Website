import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import MediaProvider from './media/MediaProvider';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MediaProvider>
        <App />
      </MediaProvider>
    </BrowserRouter>
  </StrictMode>,
);
