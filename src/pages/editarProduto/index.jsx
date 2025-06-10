// src/pages/editarProduto/index.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AtualizarProduto, LerProdutoPorId } from '../../components/data/fetchProdutos.jsx';
import { DataContext } from '../../contexts/data.jsx';

import './editarProduto.css';

const EditarProduto = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { carregarProdutos } = useContext(DataContext);

  const [formDados, setFormDados] = useState({
    nome: '',
    valor: '',
    imagem: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(''); // Estado para mensagens de feedback
  const [messageType, setMessageType] = useState(''); // 'success' ou 'error'

  const displayMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        setLoading(true);
        setError(null);
        setMessage(''); // Limpa mensagens anteriores
        setMessageType('');

        if (id) {
          const produto = await LerProdutoPorId(id);
          if (produto) {
            setFormDados({
              nome: produto.nome,
              valor: produto.valor,
              imagem: produto.imagem
            });
          } else {
            setError('Produto não encontrado.');
            displayMessage('Produto não encontrado para edição.', 'error'); // Substituído alert
            setTimeout(() => navigate('/admin/produtos/listar'), 2000); // Redireciona após a mensagem
          }
        } else {
          setError('ID do produto não fornecido para edição.');
          displayMessage('ID do produto não fornecido para edição.', 'error'); // Substituído alert
          setTimeout(() => navigate('/admin/produtos/listar'), 2000); // Redireciona após a mensagem
        }
      } catch (err) {
        console.error('Erro ao carregar produto para edição:', err);
        setError('Não foi possível carregar os dados do produto. Verifique o console.');
        displayMessage('Erro ao carregar produto para edição.', 'error'); // Substituído alert
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDados(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage(''); // Limpa mensagens anteriores
    setMessageType('');

    if (!formDados.nome || !formDados.valor || !formDados.imagem) {
      displayMessage('Por favor, preencha todos os campos do produto.', 'error'); // Substituído alert
      return;
    }

    const valorNumerico = parseFloat(formDados.valor);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      displayMessage('Por favor, insira um valor numérico válido e maior que zero para o produto.', 'error'); // Substituído alert
      return;
    }

    try {
      await AtualizarProduto(id, formDados.nome, valorNumerico, formDados.imagem);
      displayMessage('Produto atualizado com sucesso!', 'success'); // Substituído alert
      await carregarProdutos();
      setTimeout(() => navigate('/admin/produtos/listar'), 2000); // Redireciona após a mensagem
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      displayMessage('Erro ao atualizar produto. Verifique o console para detalhes.', 'error'); // Substituído alert
    }
  };

  const handleVoltar = () => {
    navigate('/admin/produtos/listar');
  };

  if (loading) {
    return (
      <div className="editar-produto-container loading">
        <p>Carregando dados do produto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="editar-produto-container error">
        <p>{error}</p>
        <button onClick={handleVoltar} className="back-to-list-button">
          Voltar para Lista de Produtos
        </button>
      </div>
    );
  }

  return (
    <div className="editar-produto-container">
      <div className="editar-produto-card">
        <h2>Editar Produto</h2>
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
              Atualizar Produto
            </button>
            <button type="button" onClick={handleVoltar} className="cancel-button">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarProduto;