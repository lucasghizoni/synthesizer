import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { AppProvider } from "./context/app";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <AppProvider>
    <App />
  </AppProvider>
);

