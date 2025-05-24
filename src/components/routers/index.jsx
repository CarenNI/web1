import React from "react";
import { Routes, Route } from "react-router-dom";


import Produtos from "../../pages/produtos/index.jsx";
import CadastroLogin from "../../pages/cadastroLogin/index.jsx"; 
import Login from "../../pages/login/index.jsx";


import PublicOnlyRoute from "../PrivateRoute.jsx";

export default function Routers() {
  return (
    <Routes>

      <Route >
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<CadastroLogin />} />
      </Route>


      <Route index element={<Login />} /> {/* Rota raiz */}
      <Route path="/produtos" element={<Produtos />} />

      <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
    </Routes>
  );
}