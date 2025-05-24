// src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from './components/routers';
import { AuthProvider } from './contexts/AuthContext.jsx';

function App() { // A função App
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routers />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App; 