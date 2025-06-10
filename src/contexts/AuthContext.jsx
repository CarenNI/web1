// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Tenta obter o estado de login do localStorage na inicialização
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // Salva o estado de autenticação no localStorage sempre que ele muda
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isAuthenticated);
  }, [isAuthenticated]);

  // Função de login agora se comunica com o json-server para verificar usuários
  const login = async (email, password) => { // Renomeado username para email para consistência
    try {
      // Faz uma requisição GET para o endpoint /users do json-server
      const response = await fetch('http://localhost:3000/users');
      if (!response.ok) {
        throw new Error('Erro ao buscar usuários para login.');
      }
      const users = await response.json();

      // Procura por um usuário que corresponda ao email e senha fornecidos
      const foundUser = users.find(user => user.email === email && user.password === password);

      if (foundUser) {
        setIsAuthenticated(true);
        //alert('Login bem-sucedido!'); // Remova alerts em produção
        return true; // Retorna TRUE para indicar sucesso
      } else {
        setIsAuthenticated(false);
        //alert('Usuário ou senha inválidos!'); // Remova alerts em produção
        return false; // Retorna FALSE para indicar falha
      }
    } catch (error) {
      console.error('Erro no processo de login:', error);
      setIsAuthenticated(false);
      //alert(`Erro ao tentar login: ${error.message}`); // Remova alerts em produção
      return false; // Retorna FALSE em caso de erro na requisição
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isLoggedIn');
    //alert('Logout realizado.'); // Remova alerts em produção
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
