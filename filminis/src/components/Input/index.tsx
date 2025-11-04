import React from 'react';
import './Input.css';

// Usando React.InputHTMLAttributes para ter todas as props de um input
type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (props) => {
  return <input className="form-input" {...props} />;
};

export default Input;