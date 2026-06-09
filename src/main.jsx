import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Produccion from './pages/Produccion';
import Ventas from './pages/Ventas';
import Agroquimicos from './pages/Agroquimicos';
import Maquinarias from './pages/Maquinarias';
import Personal from './pages/Personal';
import Usuarios from './pages/Usuarios';
import Configuracion from './pages/Configuracion';
import Combustible from './pages/Combustible';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<App />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/produccion" element={<Produccion />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/agroquimicos" element={<Agroquimicos />} />
            <Route path="/maquinarias" element={<Maquinarias />} />
            <Route path="/combustible" element={<Combustible />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/configuracion" element={<Configuracion />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
