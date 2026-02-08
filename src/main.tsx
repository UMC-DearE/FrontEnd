import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// 개발 모드에서 자동으로 dev token 주입
if (import.meta.env && import.meta.env.MODE === 'development') {
  import('../dev/setDevToken.ts');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
