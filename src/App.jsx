// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importa seus componentes e provedores de contexto
import PrivateRoute from "./components/PrivateRoute.jsx";
import DataProvider from "./contexts/data.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

// Importa suas páginas públicas (Login e Produtos da loja)
import Login from "./pages/login/index.jsx";
import Produtos from "./pages/produtos/index.jsx";

// REMOVA: import CadastroProduto from "./pages/cadastrarProduto/index.jsx";
// Este import é da página antiga combinada e não será mais necessário.

// NOVOS IMPORTS: Importa as páginas de gerenciamento de produtos separadas
import ListarProdutos from "./pages/listarProdutos/index.jsx";          // Página para listar/gerenciar produtos (admin)
import CadastrarNovoProduto from "./pages/cadastrarNovoProduto/index.jsx"; // Página para cadastrar UM NOVO produto
import EditarProduto from "./pages/editarProduto/index.jsx";            // Página para editar um produto existente


function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/produtos" element={<Produtos />} /> {/* Sua página de loja principal */}

            {/* Rotas Protegidas (apenas usuários logados) */}
            <Route element={<PrivateRoute />}>
              {/* REMOVA: <Route path="/gerenciar-produtos" element={<CadastroProduto />} /> */}
              {/* Esta rota é da página antiga combinada e será substituída. */}

              {/* NOVAS ROTAS PARA O GERENCIAMENTO DE PRODUTOS */}
              {/* Rota para a página de LISTAGEM de produtos do admin */}
              <Route path="/admin/produtos/listar" element={<ListarProdutos />} />
              {/* Rota para a página de CADASTRO de um NOVO produto */}
              <Route path="/admin/produtos/cadastrar" element={<CadastrarNovoProduto />} />
              {/* Rota para a página de EDIÇÃO de um produto existente (com ID na URL) */}
              <Route path="/admin/produtos/editar/:id" element={<EditarProduto />} />
            </Route>
          </Routes>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;