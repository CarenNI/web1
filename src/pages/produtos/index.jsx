import "./produtos";
import { FaBeer, FaShoppingCart } from "react-icons/fa";
import React from "react";
import { produtos } from "./produtos";
import Carrinho from "./carrinho/index";
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


export default function Produtos() {
  const [cartItems, setCartItems] = React.useState([]);

  const [showCart, setShowCart] = React.useState(false);
  
  const navigate = useNavigate();

  function irParaLogin() {
    navigate('/login');
  }
  
  function addItem(item) {
    setCartItems((prev) => [...prev, item]);
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
          {cartItems.length > 0 && cartItems.length}
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