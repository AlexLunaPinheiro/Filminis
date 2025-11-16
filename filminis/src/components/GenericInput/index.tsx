import styles from './GenericInput.module.css';
import React from 'react'; // Importe o React para os tipos

// 1. Defina suas props *customizadas* separadamente
type CustomInputProps = {
  label: string;
  variant?: "full" | "mid" | "min" | "textBox";
};


type GenericInputProps = CustomInputProps & React.InputHTMLAttributes<HTMLInputElement>;

function GenericInput({ label, variant = "mid", ...rest }: GenericInputProps) {
  return (
    <div className={`${styles.inputContainer} ${styles[variant]}`}>
      <label>{label}</label>
      
      <input {...rest} />
    </div>
  );
}

export default GenericInput;