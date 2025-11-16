import styles from './SeparatedInput.module.css';

type SeparatedInputProps = {
  label: string;
  placeholder: string;
  variant?: "base" | "textBox" | "profile" | "password" | "solicitationText";
  type?: string; // 1. Adicione a prop 'type'
};

function SeparatedInput({ 
  label, 
  placeholder, 
  variant = "base", 
  type = "text" // 2. Receba 'type' (com "text" como padrão)
}: SeparatedInputProps) {
  
  return (
    <div className={styles.formContainer}>
      <label className={styles.label}>{label}</label>
      
      {variant === "textBox" || variant === "solicitationText" ? (
        <textarea
          className={`${styles.input} ${styles[variant]}`}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={`${styles.input} ${styles[variant]}`}
          type={type} 
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

export default SeparatedInput;