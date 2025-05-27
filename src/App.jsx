// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importa seus componentes e provedores de contexto
import PrivateRoute from "./components/PrivateRoute.jsx"; // Caminho corrigido
import DataProvider from "./contexts/data.jsx";           // Caminho corrigido
import { AuthProvider } from "./contexts/AuthContext.jsx"; // <<-- AGORA COMO NAMED IMPORT (com chaves)

// Importa suas páginas
import Login from "./pages/login/index.jsx";
import Produtos from "./pages/produtos/index.jsx";
import CadastroProduto from "./pages/cadastrarProduto/index.jsx";

function App() {
  return (
    <Router>
      <AuthProvider> {/* O componente é usado normalmente */}
        <DataProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            <Route path="/produtos" element={<Produtos />} />

            <Route element={<PrivateRoute />}>
              <Route path="/gerenciar-produtos" element={<CadastroProduto />} />
            </Route>
          </Routes>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;