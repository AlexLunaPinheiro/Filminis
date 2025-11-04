import React from 'react';
import './Input.css';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input(props: InputProps) {
  return <input className="form-input" {...props} />;
};

export default Input;