import React from 'react';
import { createRoot } from 'react-dom/client'; // Cambiado a createRoot
import App from './App';
import './index.css'; // Estilos globales (opcional)

const container = document.getElementById('root'); // Obtiene el contenedor
const root = createRoot(container); // Crea la raíz usando createRoot
root.render(<App />); // Renderiza tu componente App
