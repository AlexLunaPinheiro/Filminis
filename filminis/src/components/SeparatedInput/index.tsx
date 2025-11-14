import styles from './SeparatedInput.module.css';

type SeparatedInputProps = {
  label: string;
  placeholder: string;
  variant?: "base" | "textBox" | "profile" | "password";
};

function SeparatedInput({ label, placeholder, variant = "base" }: SeparatedInputProps) {
  return (
    <div className={styles.formContainer}>
      <label className={styles.label}>{label}</label>
      {variant === "textBox" ? (
        <textarea
          className={`${styles.input} ${styles[variant]}`}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={`${styles.input} ${styles[variant]}`}
          type="text"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}


export default SeparatedInput;
