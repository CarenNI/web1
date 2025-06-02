// src/pages/listarProdutosAdmin/index.jsx
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../contexts/data.jsx'; // Importa o contexto de dados
import { DeletarProduto } from '../../components/data/fetchProdutos.jsx'; // Importa a função de deletar

import './listarProdutos.css'; // O CSS para esta página

const ListarProdutosAdmin = () => {
  const navigate = useNavigate();
  const { produtos, carregarProdutos } = useContext(DataContext); // Pega produtos e a função de recarga do contexto

  // Carrega os produtos quando a página é montada
  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  const handleEditar = (produtoId) => {
    // Navega para a página de edição, passando o ID do produto na URL
    navigate(`/admin/produtos/editar/${produtoId}`);
  };

  const handleExcluir = async (produtoId) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await DeletarProduto(produtoId); // Chama a função da API para deletar
        alert('Produto excluído com sucesso!');
        await carregarProdutos(); // Recarrega a lista de produtos após a exclusão
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Erro ao excluir produto. Verifique o console.');
      }
    }
  };

  const handleCadastrarNovo = () => {
    navigate('/admin/produtos/cadastrar'); // Navega para a página de cadastro de novo produto
  };

  const handleSair = () => {
    // Implemente a lógica de sair/logout aqui, se não estiver no AuthContext
    // Por enquanto, vamos voltar para a página de produtos principal
    navigate('/produtos');
  };

  return (
    <div className="admin-page-container">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h3>Área cadastro</h3> {/* Texto da imagem */}
        </div>
        <button className="admin-sidebar-button" onClick={handleCadastrarNovo}>
          Cadastrar
        </button>
        {/* O botão 'Salvar' da sidebar geralmente é para salvar configurações gerais,
            ou pode ser removido se o salvamento for apenas nos formulários específicos.
            Por enquanto, vamos omitir ou adaptar seu uso. */}
        {/* <button className="admin-sidebar-button">Salvar</button> */}
        <button className="admin-sidebar-button" onClick={handleSair}>
          Sair
        </button>
      </aside>

      <main className="admin-content-area">
        <h2>Gerenciamento de Produtos</h2> {/* Título para a área de conteúdo */}
        <div className="admin-products-grid">
          {produtos.length === 0 ? (
            <p>Nenhum produto cadastrado ainda. Use o botão "Cadastrar" para adicionar!</p>
          ) : (
            produtos.map((produto) => (
              <div className="admin-product-card" key={produto.id}>
                <img src={produto.imagem} alt={produto.nome} />
                <h4>{produto.nome}</h4>
                <p>R$ {parseFloat(produto.valor).toFixed(2).replace('.', ',')}</p>
                <button className="admin-button edit-button" onClick={() => handleEditar(produto.id)}>
                  EDITAR
                </button>
                <button className="admin-button exclude-button" onClick={() => handleExcluir(produto.id)}>
                  EXCLUIR
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ListarProdutos;