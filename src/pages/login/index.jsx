import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx'; 
import './login.css'; 

function Login() { 
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !senha.trim()) {
    alert('Por favor, preencha todos os campos!');
    return;
    }
    console.log('Tentativa de Login com:', email, senha);
    navigate('/produtos');
  };
const irParaProduto =()=>{
  navigate('/produtos')
}
  
  const irParaCadastro = () => {
    navigate('/cadastro'); 
  };



  return (
    <div className="cadastro-container"> 
      <h2>Login</h2>
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
          <button type="submit" >Entrar</button>
        
          <button type="button" onClick={irParaCadastro}>Fazer cadastro</button>
        </div>
      </form>
    </div>
  );
}

export default Login; 