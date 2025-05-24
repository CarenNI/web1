import "./produtos.css";
import { FaBeer, FaShoppingCart } from "react-icons/fa";
import React from "react";
import { produtos } from "./produtos";
import Carrinho from "./carrinho/index";
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext.jsx";


export default function Produtos() {
  const [cartItems, setCartItems] = React.useState([]);

  const [showCart, setShowCart] = React.useState(false);
  
  const navigate = useNavigate();

  function irParaLogin() {
    navigate('/login');
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
        <button onClick={irParaLogin} className="loginButton">
          Login
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
        {produtos.map((item) => {
          return (
            <div
              key={item.nome}
              className="produto"
            >
              <img
                src={item.imagem}
                alt={item.nome}
              />
              <h4>{item.nome}</h4>
              <p>R$ {item.valor.toFixed(2)}</p>
              <button onClick={() => addItem(item)}>Comprar</button>
            </div>
          );
        })}
      </div>
    </div>
  );

}