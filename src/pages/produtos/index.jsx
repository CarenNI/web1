// src/pages/produtos/index.jsx
import React, { useEffect } from 'react'; // Adicionado useEffect
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTimes } from 'react-icons/fa'; // Ícones

// Importa seus contextos
import { DataContext } from '../../contexts/data.jsx';       // Caminho corrigido para contexts/data.jsx
import { useAuth } from "../../contexts/AuthContext.jsx"; // Caminho corrigido para contexts/AuthContext.jsx

import "./produtos.css"; // CSS específico da página de produtos
// REMOVEMOS: import { produtos } from "./produtos"; // Pois os produtos virão do DataContext

// Verifique o caminho para o componente Carrinho
import Carrinho from "./carrinho/index.jsx"; // Assumindo que seu Carrinho está em pages/produtos/carrinho/index.jsx

export default function Produtos() {
  const [cartItems, setCartItems] = React.useState([]);
  const [showCart, setShowCart] = React.useState(false);

  const navigate = useNavigate();
  const { logout, user } = useAuth(); // Assume que useAuth fornece 'logout' e 'user' (para verificar se é admin, por exemplo)

  // Consome os produtos e a função de carregamento do DataContext
  const { produtos, carregarProdutos } = React.useContext(DataContext);

  // Efeito para carregar os produtos quando este componente é montado
  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]); // carregarProdutos é uma dependência do useCallback no DataProvider

  function handleLogout() {
    logout(); // Chama a função de logout do contexto de autenticação
    navigate('/login'); // Redireciona para a página de login após o logout
  }

  function irParaCadastrarProduto() {
    // IMPORTANTE: Este PATH deve CORRESPONDER EXATAMENTE ao path da rota protegida em App.jsx
    navigate('/gerenciar-produtos');
  }

  // Funções do carrinho (mantidas as mesmas)
  function addItem(productToAdd) {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(item => item.nome === productToAdd.nome);
      if (existingItem) {
        return prevCartItems.map(item =>
          item.nome === productToAdd.nome
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prevCartItems, { ...productToAdd, quantidade: 1 }];
      }
    });
  }

  function removeItem(productToRemove) {
    setCartItems((prevCartItems) =>
      prevCartItems.filter(item => item.nome !== productToRemove.nome)
    );
  }

  function increaseQuantity(productToIncrease) {
    setCartItems((prevCartItems) =>
      prevCartItems.map(item =>
        item.nome === productToIncrease.nome
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(productToDecrease) {
    setCartItems((prevCartItems) =>
      prevCartItems.map(item =>
        item.nome === productToDecrease.nome
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      ).filter(item => item.quantidade > 0)
    );
  }

  return (
    <div className="containerProdutos">
      <div className="topBar">
        <button onClick={handleLogout} className="logoutButton">
          Sair
        </button>
        {/* BOTÃO PARA CADASTRAR PRODUTO - Visível apenas para o admin (exemplo) */}
        {/* Você pode adicionar uma lógica aqui para mostrar o botão apenas se o usuário tiver permissão de admin.
            Ex: {user && user.role === 'admin' && ( */}
        <button onClick={irParaCadastrarProduto} className="cadastrarProdutoButton">
          Gerenciar Produtos
        </button>
      </div>

      <div className="cartButton">
        <button onClick={() => setShowCart(true)}>
          <FaShoppingCart size={25} />
        </button>

        <span className="cartCount">
          {cartItems.reduce((total, item) => total + item.quantidade, 0) > 0 &&
             cartItems.reduce((total, item) => total + item.quantidade, 0)}
        </span>
      </div>

      {showCart && (
        <div className="carrinhoContainer show">
          <button
            className="closeCarrinho"
            onClick={() => setShowCart(false)}
          >
            <FaTimes size={20} />
          </button>
          <Carrinho
            cartItems={cartItems}
            setCartItems={setCartItems}
            removeItem={removeItem}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
        </div>
      )}

      <div className="produtos">
        {/* Exibir produtos do Context API */}
        {produtos.length === 0 ? (
          <p>Nenhum produto cadastrado ou carregando produtos...</p>
        ) : (
          produtos.map((item) => {
            return (
              <div
                key={item.id} // É crucial usar um ID único como key
                className="produto"
              >
                <img
                  src={item.imagem}
                  alt={item.nome}
                />
                <h4>{item.nome}</h4>
                <p>R$ {parseFloat(item.valor).toFixed(2).replace('.', ',')}</p> {/* Formatação do valor */}
                <button onClick={() => addItem(item)}>Comprar</button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}