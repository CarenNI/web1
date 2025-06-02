// src/pages/editarProduto/index.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AtualizarProduto, LerProdutoPorId } from '../../components/data/fetchProdutos.jsx'; // Importa funções da API
import { DataContext } from '../../contexts/data.jsx'; // Importa o contexto de dados para recarregar produtos

import './editarProduto.css'; // O CSS para esta página

const EditarProduto = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID do produto da URL (ex: /editar/123)
  const { carregarProdutos } = useContext(DataContext); // Acessa a função para recarregar produtos

  const [formDados, setFormDados] = useState({
    nome: '',
    valor: '',
    imagem: '' // URL da imagem
  });
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento inicial dos dados do produto
  const [error, setError] = useState(null); // Estado para controlar erros de carregamento

  // Efeito para carregar os dados do produto quando o componente é montado ou o ID na URL muda
  useEffect(() => {
    const fetchProduto = async () => {
      try {
        setLoading(true);
        setError(null);
        // Garante que o ID existe e é um número antes de tentar buscar
        if (id) {
          const produto = await LerProdutoPorId(id); // Chama a função da API para ler o produto por ID
          if (produto) {
            setFormDados({
              nome: produto.nome,
              valor: produto.valor,
              imagem: produto.imagem
            });
          } else {
            setError('Produto não encontrado.');
            alert('Produto não encontrado para edição.');
            navigate('/admin/produtos/listar'); // Redireciona se o produto não existir
          }
        } else {
          setError('ID do produto não fornecido para edição.');
          navigate('/admin/produtos/listar'); // Redireciona se não houver ID
        }
      } catch (err) {
        console.error('Erro ao carregar produto para edição:', err);
        setError('Não foi possível carregar os dados do produto. Verifique o console.');
        alert('Erro ao carregar produto para edição.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduto(); // Chama a função ao montar
  }, [id, navigate]); // Depende do ID (para recarregar se mudar) e navigate (para redirecionar)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDados(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
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
      // Chama a função de atualização da API, passando o ID
      await AtualizarProduto(id, formDados.nome, valorNumerico, formDados.imagem);
      alert('Produto atualizado com sucesso!');
      await carregarProdutos(); // Recarrega a lista de produtos globalmente
      navigate('/admin/produtos/listar'); // Volta para a lista após a atualização
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      alert('Erro ao atualizar produto. Verifique o console para detalhes.');
    }
  };

  const handleVoltar = () => {
    navigate('/admin/produtos/listar'); // Volta para a página de listagem de produtos admin
  };

  // Exibe um loader enquanto os dados estão sendo carregados
  if (loading) {
    return (
      <div className="editar-produto-container loading">
        <p>Carregando dados do produto...</p>
      </div>
    );
  }

  // Exibe mensagem de erro se houver um
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
              step="0.01" // Permite valores decimais
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