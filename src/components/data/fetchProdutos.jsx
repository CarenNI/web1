
const API_URL = "http://localhost:3000/produtos";

export const CriarProduto = async (nome, valor, imagem) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, valor, imagem }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erro ao criar produto: ${errorData.message || response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro na função CriarProduto:", error);
    throw error;
  }
};

// Função para LER TODOS os produtos
export const LerProdutos = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Erro ao carregar produtos: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro na função LerProdutos:", error);
    throw error;
  }
};

export const LerProdutoPorId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`); 
    if (!response.ok) {
      if (response.status === 404) {
        return null; 
      }
      throw new Error(`Erro ao carregar produto por ID: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro na função LerProdutoPorId (ID: ${id}):`, error);
    throw error;
  }
};

// Função para ATUALIZAR um produto
export const AtualizarProduto = async (id, nome, valor, imagem) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT", // Ou PATCH, dependendo da sua API
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, valor, imagem }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erro ao atualizar produto: ${errorData.message || response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro na função AtualizarProduto:", error);
    throw error;
  }
};


export const DeletarProduto = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Erro ao deletar produto: ${response.statusText}`);
    }
    return;
  } catch (error) {
    console.error("Erro na função DeletarProduto:", error);
    throw error;
  }
};