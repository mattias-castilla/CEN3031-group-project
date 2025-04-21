import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import HamburgerMenu from './components/HamburgerMenu';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HamburgerMenu />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
