import { createContext, useEffect, useState } from "react";
// Correção aqui:
import { LerProdutos } from "../components/data/fetchProdutos.jsx";
export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [produtos, setProdutos] = useState([]);
  const [aux, setAux] = useState(0); // Função desconhecida, manter se tiver um uso específico

  // Função para carregar os produtos
  const carregarProdutos = async () => {
    try {
      const data = await LerProdutos(); // Chama a API e obtém os dados
      setProdutos(data); // Atualiza o estado aqui no Context
    } catch (error) {
      console.error("Erro ao carregar produtos no Context:", error);
      // Poderia adicionar um estado de erro aqui se quisesse propagar
    }
  };

  useEffect(() => {
    carregarProdutos(); // Carrega os produtos quando o provedor é montado
  }, []);

  return (
    <DataContext.Provider value={{ produtos, setProdutos, setAux, aux, carregarProdutos }}>
      {/* Adicionado carregarProdutos ao value para que outros componentes possam chamar a recarga */}
      {children}
    </DataContext.Provider>
  );
}