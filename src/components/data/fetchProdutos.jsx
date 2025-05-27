
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/produtos"; 
export async function CriarProduto(nome, valor, imagem) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/criar`, 
      { nome, valor, imagem },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Sucesso em criar produto:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw error; 
  }
}

export async function LerProdutos() { 
  try {
    const response = await axios.get(`${API_BASE_URL}/ler`, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em ler produtos");
    return response.data; 
  } catch (error) {
    console.error("Erro ao ler produtos:", error);
    throw error;
  }
}

export async function DeletarProduto(id) {
  try {
    
    const response = await axios.delete(
      `${API_BASE_URL}/deletar`, 
      { data: { id } },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Sucesso em deletar produto");
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    throw error;
  }
}

export async function AtualizarProduto(id, nome, valor, imagem) {
  try {

    const response = await axios.post( 
      `${API_BASE_URL}/editar`, 
      { id, nome, valor, imagem },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Sucesso em editar produto");
    return response.data;
  } catch (error) {
    console.error("Erro ao editar produto:", error);
    throw error;
  }
}