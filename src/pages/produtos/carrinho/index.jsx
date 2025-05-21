import React from 'react';
import './carrinho.css'; // Seu CSS para o carrinho
import { FaTimes } from 'react-icons/fa'; // Ícone para remover item

function Carrinho({ cartItems, removeItem, increaseQuantity, decreaseQuantity }) {
  // Calcula o total do carrinho
  const total = cartItems.reduce((acc, item) => acc + (item.valor * item.quantidade), 0);

  return (
    <div className="carrinho-content">
      <h3>Seu Carrinho</h3>
      {cartItems.length === 0 ? (
        <p className="carrinho-vazio-mensagem">Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="lista-carrinho">
            {cartItems.map((item) => (
              <li key={item.nome} className="item-carrinho">
                <img src={item.imagem} alt={item.nome} className="item-carrinho-imagem" />
                <div className="item-carrinho-detalhes">
                  <h4>{item.nome}</h4>
                  <p>R$ {item.valor.toFixed(2)}</p>
                  <div className="item-carrinho-quantidade">
                    <button onClick={() => decreaseQuantity(item)}>-</button>
                    <span>{item.quantidade}</span>
                    <button onClick={() => increaseQuantity(item)}>+</button>
                  </div>
                </div>
                <button
                  className="remover-item-btn"
                  onClick={() => removeItem(item)}
                >
                  <FaTimes />
                </button>
              </li>
            ))}
          </ul>
          <div className="carrinho-total">
            <p>Total: <strong>R$ {total.toFixed(2)}</strong></p>
          </div>
          <button className="finalizar-compra-btn">Finalizar Compra</button>
        </>
      )}
    </div>
  );
}

export default Carrinho;