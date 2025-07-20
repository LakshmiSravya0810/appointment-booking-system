import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Confirmation from './Confirmation'; // ✅ Make sure this file exists
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
