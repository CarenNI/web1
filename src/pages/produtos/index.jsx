// src/pages/produtos/index.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';

import { DataContext } from '../../contexts/data.jsx';
import { useAuth } from "../../contexts/AuthContext.jsx";

import "./produtos.css";

import Carrinho from "./carrinho/index.jsx";

export default function Produtos() {
  const [cartItems, setCartItems] = React.useState([]);
  const [showCart, setShowCart] = React.useState(false);

  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const { produtos, carregarProdutos } = React.useContext(DataContext);

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  function irParaCadastrarProduto() {
    navigate('/admin/produtos/listar');
  }

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
        {produtos.length === 0 ? (
          <p>Nenhum produto cadastrado ou carregando produtos...</p>
        ) : (
          produtos.map((item) => {
            return (
              <div
                key={item.id}
                className="produto"
              >
                <img
                  src={item.imagem}
                  alt={item.nome}
                />
                <h4>{item.nome}</h4>
                <p>R$ {parseFloat(item.valor).toFixed(2).replace('.', ',')}</p>
                <button onClick={() => addItem(item)}>Comprar</button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
