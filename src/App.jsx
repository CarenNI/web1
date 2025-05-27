
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import PrivateRoute from "./components/PrivateRoute.jsx"; 
import DataProvider from "./contexts/data.jsx";           
import { AuthProvider } from "./contexts/AuthContext.jsx"; 


import Login from "./pages/login/index.jsx";
import Produtos from "./pages/produtos/index.jsx";
import CadastroProduto from "./pages/cadastrarProduto/index.jsx";

function App() {
  return (
    <Router>
      <AuthProvider> 
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