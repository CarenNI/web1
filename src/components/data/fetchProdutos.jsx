// src/services/produtoService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/produtos"; // URL base para as rotas de produto

export async function CriarProduto(nome, valor, imagem) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/criar`, // Usando a URL base
      { nome, valor, imagem },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Sucesso em criar produto:", response.data);
    return response.data; // Retorna os dados do produto criado (geralmente com ID)
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw error; // Propaga o erro para ser tratado no componente
  }
}

export async function LerProdutos() { // REMOVIDO 'setProdutos' daqui
  try {
    const response = await axios.get(`${API_BASE_URL}/ler`, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em ler produtos");
    return response.data; // APENAS RETORNA OS DADOS
  } catch (error) {
    console.error("Erro ao ler produtos:", error);
    throw error;
  }
}

export async function DeletarProduto(id) {
  try {
    // Para DELETE, o ID geralmente vai na URL ou como parâmetro.
    // Se seu backend espera o ID no corpo como { id }, mantenha.
    // Se espera na URL (RESTful), seria: `${API_BASE_URL}/deletar/${id}`
    const response = await axios.delete(
      `${API_BASE_URL}/deletar`, // Verifique se seu backend espera o ID no corpo ou na URL
      { data: { id } }, // Para enviar dados no corpo de um DELETE com Axios, use a propriedade `data`
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
    // Para PUT/PATCH, o ID geralmente vai na URL.
    // Seu backend está usando POST para editar. Mantenha se for assim.
    // Se seu backend espera PUT/PATCH, considere mudar para axios.put ou axios.patch
    const response = await axios.post( // Ou axios.put / axios.patch se seu backend for RESTful
      `${API_BASE_URL}/editar`, // Verifique se seu backend espera o ID na URL ou no corpo
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