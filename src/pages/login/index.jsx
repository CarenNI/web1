// src/pages/login/index.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx'; 
import './login.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSubmit = async (e) => { 
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    console.log('Tentativa de Login com:', username, password);

    
    const success = await login(username, password);

    if (success) {
      navigate('/produtos'); 
    } else {
   
    }
  };

  const irParaCadastro = () => {
    navigate('/cadastroLogin');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuário:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='botoes'>
            <button type="submit" className="login-button">Entrar</button>
            <button type="button" onClick={irParaCadastro} className="register-button">
              Fazer cadastro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
