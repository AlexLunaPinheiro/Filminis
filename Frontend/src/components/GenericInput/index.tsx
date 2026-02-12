import styles from './GenericInput.module.css';
import React from 'react';

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