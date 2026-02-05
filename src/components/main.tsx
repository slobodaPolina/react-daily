import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '../styles/index.scss';
import { App } from './App.tsx';

createRoot(document.getElementsByTagName('body').item(0)!).render(
  <>
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />

    <StrictMode>
      <App />
    </StrictMode>
  </>,
);
