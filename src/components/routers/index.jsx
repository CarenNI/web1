import React from "react";
import { Routes, Route } from "react-router-dom";

// Importe seus componentes de página
import Produtos from "../../pages/produtos/index.jsx";
import CadastroLogin from "../../pages/cadastrologin/index.jsx"; // Assumindo que este é o componente de cadastro
import Login from "../../pages/login/index.jsx";

// Importe o PublicOnlyRoute (APENAS ESTA LINHA É NECESSÁRIA)
import PublicOnlyRoute from "../PublicOnlyRoute";

export default function Routers() {
  return (
    <Routes>
      {/* Rotas acessíveis SOMENTE se o usuário NÃO estiver logado.
          Se ele estiver logado, será redirecionado para '/produtos'.
      */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<CadastroLogin />} />
      </Route>

      {/* Rotas que podem ser acessadas tanto por usuários logados quanto por não logados.
          Ou seja, são as rotas "públicas" normais.
      */}
      <Route index element={<Produtos />} /> {/* Rota raiz */}
      <Route path="/produtos" element={<Produtos />} />

      {/*
          OPCIONAL: Você ainda pode ter rotas que exigem login (rotas privadas no sentido tradicional).
          Ex: Uma página de Dashboard que só logados podem ver.
          Para isso, você usaria o PrivateRoute que fizemos antes.
      */}
      {/*
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<h1>Dashboard do Usuário Logado</h1>} />
      </Route>
      */}

      {/* Rota para páginas não encontradas */}
      <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
    </Routes>
  );
}