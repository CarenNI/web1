// src/pages/cadastrarProduto/index.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Importa as funções do seu serviço de API (para criar, deletar, atualizar)
import {
  CriarProduto,
  DeletarProduto,
  AtualizarProduto
} from '../../components/data/fetchProdutos.jsx'; // <<-- Caminho corrigido para components/data/fetchProdutos.jsx

// Importa seu DataContext (para acessar e recarregar a lista de produtos)
import { DataContext } from '../../contexts/data.jsx'; // <<-- Caminho corrigido para contexts/data.jsx

import './cadastroproduto.css'; // CSS específico da página de cadastro de produtos

const CadastroProduto = () => {
  // Acessa os produtos e a função de recarregamento do contexto
  const { produtos, carregarProdutos } = useContext(DataContext); // Não precisamos de setProdutos aqui, pois carregarProdutos fará o trabalho

  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);
  const [formDados, setFormDados] = useState({
    id: null,
    nome: '',
    valor: '',
    imagem: ''
  });

  const navigate = useNavigate();

  // Removido o useEffect para carregarProdutos daqui, pois o DataProvider já faz isso globalmente.
  // A lista de produtos agora vem do contexto.

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDados(prev => ({ ...prev, [name]: value }));
  };

  const limparFormulario = () => {
    setFormDados({ id: null, nome: '', valor: '', imagem: '' });
    setProdutoEmEdicao(null);
  };

  const salvarProduto = async (e) => {
    e.preventDefault();

    if (!formDados.nome || !formDados.valor || !formDados.imagem) {
      alert('Por favor, preencha todos os campos do produto.');
      return;
    }

    const valorNumerico = parseFloat(formDados.valor);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      alert('Por favor, insira um valor numérico válido e maior que zero para o produto.');
      return;
    }

    try {
      if (produtoEmEdicao) {
        // Chamar a função de atualização da API
        await AtualizarProduto(formDados.id, formDados.nome, valorNumerico, formDados.imagem);
        alert('Produto atualizado com sucesso na API!');
      } else {
        // Chamar a função de criação da API
        await CriarProduto(formDados.nome, valorNumerico, formDados.imagem);
        alert('Produto cadastrado com sucesso na API!');
      }
      limparFormulario();
      await carregarProdutos(); // Chama a função de recarga do Context para atualizar a lista em todos os lugares
    } catch (err) {
      alert('Erro ao salvar produto. Verifique o console para mais detalhes.');
      console.error("Erro no salvarProduto:", err);
    }
  };

  const iniciarEdicao = (produto) => {
    setProdutoEmEdicao(produto);
    setFormDados({
      id: produto.id,
      nome: produto.nome,
      valor: produto.valor,
      imagem: produto.imagem
    });
  };

  const excluirProduto = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await DeletarProduto(id); // Chama a função de exclusão da API
        alert('Produto excluído com sucesso da API!');
        limparFormulario(); // Limpa o formulário caso o produto editado seja excluído
        await carregarProdutos(); // Chama a função de recarga do Context
      } catch (err) {
        alert('Erro ao excluir produto. Verifique o console para mais detalhes.');
        console.error("Erro no excluirProduto:", err);
      }
    }
  };

  const handleSair = () => {
    navigate('/produtos'); // Redireciona de volta para a página de produtos
  };

  return (
    <div className="cadastro-produto-container">
      <aside className="cadastro-sidebar">
        <h2>Gerenciar Produtos</h2>
        <form onSubmit={salvarProduto}>
          <h3>{produtoEmEdicao ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h3>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={formDados.nome}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Valor:</label>
            <input
              type="number"
              name="valor"
              value={formDados.valor}
              onChange={handleInputChange}
              step="0.01"
              required
            />
          </div>
          <div>
            <label>URL da Imagem:</label>
            <input
              type="text"
              name="imagem"
              value={formDados.imagem}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit">
              {produtoEmEdicao ? 'Atualizar Produto' : 'Cadastrar Produto'}
            </button>
            {produtoEmEdicao && (
              <button type="button" onClick={limparFormulario} className="cancel-button">
                Cancelar Edição
              </button>
            )}
          </div>
        </form>
        <button onClick={handleSair} className="back-button">Voltar para Produtos</button>
      </aside>

      <main className="lista-produtos-gerenciamento">
        <h3>Lista de Produtos Atuais</h3>
        {produtos.length === 0 ? (
          <p>Nenhum produto cadastrado ainda. Use o formulário ao lado para adicionar!</p>
        ) : (
          <div className="produtos-grid-gerenciamento">
            {produtos.map((produto) => (
              <div className="produto-card-gerenciamento" key={produto.id}> {/* Usando produto.id como key */}
                <img src={produto.imagem} alt={produto.nome} />
                <h4>{produto.nome}</h4>
                <p>R$ {parseFloat(produto.valor).toFixed(2).replace('.', ',')}</p>
                <div className="card-buttons">
                  <button onClick={() => iniciarEdicao(produto)} className="edit-button">Editar</button>
                  <button onClick={() => excluirProduto(produto.id)} className="delete-button">Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CadastroProduto;