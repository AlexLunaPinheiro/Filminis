import styles from './GenericInput.module.css';

type GenericInputProps = {
  label: string;
  placeholder: string;
  variant?: "full" | "mid" | "textBox";
};

function GenericInput({ label, placeholder, variant = "mid" }: GenericInputProps) {
  return (
    <div className={`${styles.inputContainer} ${styles[variant]}`}>
      <label>{label}</label>
      <input type="text" placeholder={placeholder} />
    </div>
  );
}

export default GenericInput;
