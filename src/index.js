import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the 'react-dom/client' module for React 18
import App from './App';
import './styles/App.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
