import React from 'react';
import { createRoot } from 'react-dom/client'
import { App } from './App';
import { CssBaseline } from '@mui/material';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
