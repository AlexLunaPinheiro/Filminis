import React from 'react';
import ButtonGeneric from '../ButtonGeneric';
import GenericInput from '../GenericInput';
import FormTitleIcon from '../FormTitleIcon';
import Title from '../Title';
import './RegistrationForm.css';

function LoginForm(){
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Conta criada!');
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <div className='formTitleContainer'>
        <FormTitleIcon text='Login' variant='min'/>
        <Title>Faça seu login:</Title>
      </div>

      <div className='formInputsContainer'>
        <GenericInput label="Username" placeholder='Digite seu nome de usuário' variant='min' type="text"></GenericInput>
        <GenericInput label="Email" placeholder='Digite seu E-mail' variant='min' type="email"></GenericInput>
        <GenericInput label="Senha" placeholder='Digite sua senha' variant='min' type="password"></GenericInput>
      </div>
      
        
      <ButtonGeneric variant='login'>Entrar</ButtonGeneric>
    </form>
  );
};

export default LoginForm;