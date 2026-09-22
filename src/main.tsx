import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { initGA } from '@/utils/ga';
import { initAppHeight } from '@/utils/appHeight';

initGA();
initAppHeight();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
