// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute.jsx";
import DataProvider from "./contexts/data.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

import Login from "./pages/login/index.jsx";
import CadastroLogin from "./pages/cadastroLogin/index.jsx";
import Produtos from "./pages/produtos/index.jsx";

import ListarProdutosAdmin from "./pages/listarProdutosAdmin/index.jsx";
import CadastrarNovoProduto from "./pages/cadastrarNovoProduto/index.jsx";
import EditarProduto from "./pages/editarProduto/index.jsx";


function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastroLogin" element={<CadastroLogin />} />

            <Route element={<PrivateRoute />}>
              <Route path="/produtos" element={<Produtos />} />

              <Route path="/admin/produtos/listar" element={<ListarProdutosAdmin />} />
              <Route path="/admin/produtos/cadastrar" element={<CadastrarNovoProduto />} />
              <Route path="/admin/produtos/editar/:id" element={<EditarProduto />} />
            </Route>
          </Routes>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;