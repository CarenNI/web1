import { createContext, useEffect, useState } from "react";
// Correção aqui:
import { LerProdutos } from "../components/data/fetchProdutos.jsx";
export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [produtos, setProdutos] = useState([]);
  const [aux, setAux] = useState(0); 


  const carregarProdutos = async () => {
    try {
      const data = await LerProdutos(); 
      setProdutos(data); 
    } catch (error) {
      console.error("Erro ao carregar produtos no Context:", error);
      
    }
  };

  useEffect(() => {
    carregarProdutos(); 
  }, []);

  return (
    <DataContext.Provider value={{ produtos, setProdutos, setAux, aux, carregarProdutos }}>
      
      {children}
    </DataContext.Provider>
  );
}