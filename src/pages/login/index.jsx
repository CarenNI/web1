import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx'; // Caminho: '../../contexts/AuthContext.jsx'

import './login.css'; // Assumindo que você tem um login.css

function Login() { // Corrigido para Login (maiúscula)
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Removido 'nome', pois não é usado neste componente de Login
    console.log('Tentativa de Login com:', email, senha);
    // Aqui você adicionaria a lógica de autenticação
  };

  // Nome da função mais claro para navegar para o cadastro
  const irParaCadastro = () => {
    navigate('/cadastro'); // Rota correta para o cadastro, conforme seu Routers.jsx
  };

  return (
    <div className="cadastro-container"> {/* Considere renomear para login-container */}
      <h2>Login</h2> {/* Título para Login */}
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
          {/* Usando a função corrigida e nomeada corretamente */}
          <button type="button" onClick={irParaCadastro}>Fazer cadastro</button>
        </div>
      </form>
    </div>
  );
}

export default Login; // Corrigido para exportar Login