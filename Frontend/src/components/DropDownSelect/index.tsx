import styles from './DropDownSelect.module.css';
import { useState } from "react";
import Down from '../../assets/icons/Down.png'

type DropDownSelectProps = {
    label: string;
    options: string[];
    value: string | null;
    onChange: (value: string) => void;
};

function DropDownSelect({ label, options, value, onChange }: DropDownSelectProps) {
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(!open);

    return (
        <div className={styles.container}>

            <label className={styles.fixedLabel}>{label}:</label>

            <div 
                className={`${styles.selectBox} ${open ? styles.openBox : ''}`} 
                onClick={toggle}
            >
                <span className={styles.placeholder}>
                    {value || "Selecione..."}  
                </span>

                <span className={`${styles.icon} ${open ? styles.open : ''}`}>
                    <img src={Down}></img>
                </span>
            </div>

            {open && (
                <ul className={styles.dropdown}>
                    {options.map((option) => (
                        <li 
                            key={option} 
                            onClick={() => { 
                                onChange(option);
                                setOpen(false);
                            }}
                        >
                        {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DropDownSelect;