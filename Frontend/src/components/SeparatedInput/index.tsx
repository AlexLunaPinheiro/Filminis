import styles from './SeparatedInput.module.css';
import React from 'react'; // Importar React para ChangeEvent

type SeparatedInputProps = {
  label: string;
  placeholder: string;
  variant?: "base" | "textBox" | "profile" | "password" | "solicitationText";
  type?: string;
  // 1. Adicionar props de componente controlado
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  readOnly?: boolean;
};

function SeparatedInput({ 
  label, 
  placeholder, 
  variant = "base", 
  type = "text",
  value,       // 2. Receber as props
  onChange,
  readOnly = false
}: SeparatedInputProps) {
  
  return (
    <div className={styles.formContainer}>
      <label className={styles.label}>{label}</label>
      
      {variant === "textBox" || variant === "solicitationText" ? (
        <textarea
          className={`${styles.input} ${styles[variant]}`}
          placeholder={placeholder}
          value={value}       // 3. Conectar
          onChange={onChange} // 3. Conectar
          readOnly={readOnly}
        />
      ) : (
        <input
          className={`${styles.input} ${styles[variant]}`}
          type={type} 
          placeholder={placeholder}
          value={value}       // 3. Conectar
          onChange={onChange} // 3. Conectar
          readOnly={readOnly}
        />
      )}
    </div>
  );
}

export default SeparatedInput;