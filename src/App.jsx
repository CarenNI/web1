import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routers from "./components/routers"; 
import { AuthProvider } from './contexts/AuthContext.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
}

export default App;
