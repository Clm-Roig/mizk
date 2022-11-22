import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-image-crop/dist/ReactCrop.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
