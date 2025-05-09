import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // já importado, ok!

import './login.css';

function login() {
 
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Cadastro realizado com:', nome, email, senha);
  };

  const irParaLogin = () => {
    navigate('/cadastroLogin');
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
  
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div className='botoes'>
          <button type="submit">Entrar</button>
          <button type="button" onClick={irParaCadastroLogin}>Fazer cadastro</button>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
