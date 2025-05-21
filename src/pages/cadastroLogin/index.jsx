import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // já importado, ok!
import { useAuth } from '../../contexts/AuthContext.jsx'; // Caminho: '../../contexts/AuthContext.jsx'
import './cadastro.css';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate(); // aqui está o hook de navegação

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Cadastro realizado com:', nome, email, senha);
  };

  const irParaLogin = () => {
    navigate('/login'); // redireciona para /login
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
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
          <button type="submit">Cadastrar</button>
          <button type="button" onClick={irParaLogin}>Fazer Login</button>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
