import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';


function PublicOnlyRoute() {
  const { isAuthenticated } = useAuth(); // Obtém o estado de autenticação

  // Se o usuário JÁ ESTIVER logado, redireciona para /produtos
  // Caso contrário, permite acesso à rota (login/cadastro)
  return isAuthenticated ? <Navigate to="/produtos" replace /> : <Outlet />;
}

export default PublicOnlyRoute;