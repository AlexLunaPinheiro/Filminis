import styles from './ContactInput.module.css';

type ContactInputProps = {
  label: string;
  placeholder: string;
  variant?: "base" | "textBox";
};

function ContactInput({ label, placeholder, variant = "base" }: ContactInputProps) {
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


export default ContactInput;
