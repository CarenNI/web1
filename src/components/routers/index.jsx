import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Produtos from "../../pages/produtos/index.jsx";
import CadastroLogin from "../../pages/cadastroLogin/index.jsx";
import Login from "../../pages/login/index.jsx";

export default function Routers() { 
  return (
    <Routes>
  
    <Route index element={<Produtos />} />

    <Route path="/produtos" element={<Produtos />} />
    <Route path="/cadastro" element={<CadastroLogin />} />
    <Route path="/login" element={<Login />} />
  </Routes>
  );
}
