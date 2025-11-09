import styles from './GenericInput.module.css';

type GenericInputProps ={
    label: string,
    placeholder: string
}

function GenericInput({ label, placeholder }: GenericInputProps) {
  return (
    <div className={`${styles.inputContainer} ${styles.textBox}`}>
      <label>{label}</label>
      <input type="text" placeholder={placeholder} />
    </div>
  );
}

export default GenericInput;