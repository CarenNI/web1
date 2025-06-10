// src/pages/cadastrarNovoProduto/index.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CriarProduto } from '../../components/data/fetchProdutos.jsx';
import { DataContext } from '../../contexts/data.jsx';

import './cadastrarNovoProduto.css';
const CadastrarNovoProduto = () => {
  const navigate = useNavigate();
  const { carregarProdutos } = useContext(DataContext);

  const [formDados, setFormDados] = useState({
    nome: '',
    valor: '',
    imagem: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const displayMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDados(prev => ({ ...prev, [name]: value }));
  };

  const limparFormulario = () => {
    setFormDados({ nome: '', valor: '', imagem: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formDados.nome || !formDados.valor || !formDados.imagem) {
      displayMessage('Por favor, preencha todos os campos do produto.', 'error');
      return;
    }

    const valorNumerico = parseFloat(formDados.valor);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      displayMessage('Por favor, insira um valor numérico válido e maior que zero para o produto.', 'error');
      return;
    }

    try {
      await CriarProduto(formDados.nome, valorNumerico, formDados.imagem);
      displayMessage('Produto cadastrado com sucesso!', 'success');
      limparFormulario();
      await carregarProdutos();

    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      displayMessage('Erro ao cadastrar produto. Verifique o console para detalhes.', 'error');
    }
  };

  const handleVoltar = () => {
    navigate('/admin/produtos/listar');
  };

  return (
    <div className="cadastrar-produto-container">
      <div className="cadastrar-produto-card">
        <h2>Cadastrar Novo Produto</h2>
        {message && (
          <div className={`message-box ${messageType === 'success' ? 'message-success' : 'message-error'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formDados.nome}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imagem">URL da Imagem:</label>
            <input
              type="text"
              id="imagem"
              name="imagem"
              value={formDados.imagem}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="valor">Valor:</label>
            <input
              type="number"
              id="valor"
              name="valor"
              value={formDados.valor}
              onChange={handleInputChange}
              step="0.01"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="save-button">
              Salvar
            </button>
            <button type="button" onClick={limparFormulario} className="clear-button">
              Limpar
            </button>
          </div>
        </form>
        <button onClick={handleVoltar} className="back-to-list-button">
          Voltar para Lista de Produtos
        </button>
      </div>
    </div>
  );
};

export default CadastrarNovoProduto;