import styles from './GenericInput.module.css';

type GenericInputProps = {
  label: string;
  placeholder: string;
  variant?: "full" | "mid" | "min" | "textBox";
  type: string
};

function GenericInput({ label, placeholder, variant = "mid", type }: GenericInputProps) {
  return (
    <div className={`${styles.inputContainer} ${styles[variant]}`}>
      <label>{label}</label>
      <input type={type} placeholder={placeholder} />
    </div>
  );
}

export default GenericInput;
