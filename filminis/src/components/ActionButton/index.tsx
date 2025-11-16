import styles from './ActionButton.module.css';

type ActionButtonProps = {
    text: string,
    variant: "create" | "delete" | "update",
    onClick?: () => void;

}

function ActionButton({text, variant, onClick }: ActionButtonProps){
    return(
        <button className={`${styles.actionButton} ${styles[variant]}`} onClick={onClick}>
            {text}
        </button>
    )
};

export default ActionButton;