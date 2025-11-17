import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonGeneric from '../ButtonGeneric';
import GenericInput from '../GenericInput';
import Title from '../Title';
import './RegistrationForm.css';

// 1. Imports de autenticação
import { login } from '../../services/interceptors/auth_interceptor';
import { useAuth } from '../../context/auth_context';

function LoginForm(){
  // 2. Estados para os campos e erros
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // 3. Hooks de navegação e autenticação
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Limpa erros antigos

    if (!email || !password) {
      setError("Email e senha são obrigatórios.");
      return;
    }

    try {
      // 4. Chame o interceptor
      const data = await login(email, password);
      
      // 5. Atualize o Contexto Global
      auth.login(data.user, data.token);

      // 6. Redirecione o usuário
      // Se for admin, vá para um dashboard de admin (criar rota), senão, perfil
      if (data.user.role === 'ADMIN') {
        navigate("/admin"); // (Você precisará criar esta rota e página de Admin)
      } else {
        navigate("/profile");
      }

    } catch (err: any) {
      // 7. Mostre o erro do backend (ex: "Senha incorreta.")
      setError(err.message || "Erro desconhecido no login.");
    }
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <div className='formTitleContainer'>
        <Title>Faça seu login:</Title>
      </div>

      <div className='formInputsContainer'>
        <GenericInput 
          label="Email" 
          placeholder='Digite seu E-mail' 
          variant='min' 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <GenericInput 
          label="Senha" 
          placeholder='Digite sua senha' 
          variant='min' 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      
      {error && <p>{error}</p>}
        
      <ButtonGeneric variant='login'>Entrar</ButtonGeneric>
    </form>
  );
};

export default LoginForm;