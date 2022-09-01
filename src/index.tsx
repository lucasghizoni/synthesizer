import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { AudioApiProvider } from "./hooks/audio-api-context";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <AudioApiProvider>
    <App />
  </AudioApiProvider>
);

