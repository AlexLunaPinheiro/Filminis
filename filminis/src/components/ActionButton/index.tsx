import styles from './ActionButton.module.css';

type ActionButtonProps = {
    text: string,
    variant: "create" | "delete" | "update",

}

function ActionButton({text, variant }: ActionButtonProps){
    return(
        <button className={`${styles.actionButton} ${styles[variant]}`}>
            {text}
        </button>
    )
};

export default ActionButton;