// src/pages/cadastroLogin/index.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './cadastroLogin.css'; // CSS para a página de cadastro de login

const CadastroLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
  const [message, setMessage] = useState(''); // Estado para mensagens de feedback
  const [messageType, setMessageType] = useState(''); // 'success' ou 'error'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage(''); // Limpa mensagens anteriores
    setMessageType('');

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setMessage('Por favor, preencha todos os campos!');
      setMessageType('error');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem!');
      setMessageType('error');
      return;
    }

    setLoading(true);

    try {
      
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ email, password }), 
      });

      if (!response.ok) {
     
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar usuário.');
      }

      // Se a requisição foi bem-sucedida
      const newUser = await response.json(); 
      console.log('Usuário cadastrado com sucesso:', newUser);

      setMessage('Cadastro realizado com sucesso!');
      setMessageType('success');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      
      setTimeout(() => navigate('/login'), 2000); 
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      setMessage(`Erro ao cadastrar: ${error.message || 'Verifique o console.'}`);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleVoltar = () => {
    navigate('/login');
  };

  return (
    <div className="cadastro-login-container">
      <div className="cadastro-login-card">
        <h2>Criar Nova Conta</h2>
        {message && (
          <div className={`message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Senha:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="cadastro-button" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Registrar'}
          </button>
        </form>
        <button onClick={handleVoltar} className="back-button" disabled={loading}>Voltar para Login</button>
      </div>
    </div>
  );
};

export default CadastroLogin;
