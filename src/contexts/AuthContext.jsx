// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Tenta obter o estado de login do localStorage ao carregar
    // Certifique-se de que 'true' e 'false' são strings aqui
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // Salva o estado de login no localStorage sempre que ele muda
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isAuthenticated);
  }, [isAuthenticated]);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isLoggedIn'); // Limpa também no logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};