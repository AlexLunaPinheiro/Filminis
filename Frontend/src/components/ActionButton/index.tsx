import styles from './ActionButton.module.css';

type ActionButtonProps = {
    text: string,
    variant: "create" | "delete" | "update",
    onClick?: () => void;
    disabled?: boolean; // 1. Adicione a prop disabled
}

function ActionButton({text, variant, onClick, disabled }: ActionButtonProps){
    return(
        <button 
            className={`${styles.actionButton} ${styles[variant]}`} 
            onClick={onClick}
            disabled={disabled} // 2. Passe para o botão
        >
            {text}
        </button>
    )
};

export default ActionButton;