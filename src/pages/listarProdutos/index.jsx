// src/pages/listarProdutosAdmin/index.jsx
import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../contexts/data.jsx';
import { DeletarProduto } from '../../components/data/fetchProdutos.jsx';

import './listarProdutosAdmin.css'; // Caminho do CSS corrigido

const ListarProdutosAdmin = () => {
  const navigate = useNavigate();
  const { produtos, carregarProdutos } = useContext(DataContext);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [produtoToDeleteId, setProdutoToDeleteId] = useState(null);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  const displayMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleEditar = (produtoId) => {
    navigate(`/admin/produtos/editar/${produtoId}`);
  };

  const confirmExcluir = (produtoId) => {
    setProdutoToDeleteId(produtoId);
    setShowConfirmModal(true);
  };

  const handleExcluirConfirmed = async () => {
    setShowConfirmModal(false);
    if (!produtoToDeleteId) return;

    try {
      await DeletarProduto(produtoToDeleteId);
      displayMessage('Produto excluído com sucesso!', 'success');
      await carregarProdutos();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      displayMessage('Erro ao excluir produto. Verifique o console.', 'error');
    } finally {
      setProdutoToDeleteId(null);
    }
  };

  const handleCancelExcluir = () => {
    setShowConfirmModal(false);
    setProdutoToDeleteId(null);
  };

  const handleCadastrarNovo = () => {
    navigate('/admin/produtos/cadastrar');
  };

  const handleSair = () => {
    navigate('/produtos');
  };

  return (
    <div className="admin-page-container">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h3>Área de Administração</h3>
        </div>
        <button className="admin-sidebar-button" onClick={handleCadastrarNovo}>
          Cadastrar Novo
        </button>
        <button className="admin-sidebar-button" onClick={handleSair}>
          Voltar para Loja
        </button>
      </aside>

      <main className="admin-content-area">
        <h2>Gerenciamento de Produtos</h2>

        {message && (
          <div className={`message-box ${messageType === 'success' ? 'message-success' : 'message-error'}`}>
            {message}
          </div>
        )}

        <div className="admin-products-grid">
          {produtos.length === 0 ? (
            <p>Nenhum produto cadastrado ainda. Use o botão "Cadastrar Novo" para adicionar!</p>
          ) : (
            produtos.map((produto) => (
              <div className="admin-product-card" key={produto.id}>
                <img src={produto.imagem} alt={produto.nome} />
                <h4>{produto.nome}</h4>
                <p>R$ {parseFloat(produto.valor).toFixed(2).replace('.', ',')}</p>
                <div className="admin-card-actions">
                  <button className="admin-button edit-button" onClick={() => handleEditar(produto.id)}>
                    EDITAR
                  </button>
                  <button className="admin-button exclude-button" onClick={() => confirmExcluir(produto.id)}>
                    EXCLUIR
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmar Exclusão</h3>
            <p>Você tem certeza que deseja excluir este produto?</p>
            <div className="modal-actions">
              <button className="modal-button confirm-button" onClick={handleExcluirConfirmed}>
                Sim, Excluir
              </button>
              <button className="modal-button cancel-button" onClick={handleCancelExcluir}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListarProdutosAdmin;