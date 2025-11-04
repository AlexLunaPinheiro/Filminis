import React from 'react';
import FormField from '../LoginFormField';
import ButtonGroup from '../LoginButtonGroup';
import Button from '../Button';
import Title from '../Title';
import './RegistrationForm.css';

const RegistrationForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Conta criada!');
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <ButtonGroup />
      <Title>Crie sua conta:</Title>
      
      <div className="input-row">
        <FormField label="Nome:" type="text" placeholder="Digite seu nome" name="firstName" />
        <FormField label="Sobrenome:" type="text" placeholder="Digite seu sobrenome" name="lastName" />
      </div>
      
      <FormField label="Email:" type="email" placeholder="Digite seu e-mail" name="email" />
      <FormField label="Telefone:" type="tel" placeholder="Digite seu telefone (**)" name="phone" />
      
      <Button type="submit">Crie sua conta</Button>
    </form>
  );
};

export default RegistrationForm;