import Lupa from '../../assets/icons/Lupa.png'
import Styles from './YearInput.module.css'
import { useState } from 'react'; // 1. Importar

type YearInputProps = {
    initialValue: string;
    setSearchText: (text: string) => void;
};

function YearInput({ initialValue, setSearchText }: YearInputProps){
    // (Mesma lógica do FilterInput)
    const [localText, setLocalText] = useState(initialValue);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setSearchText(localText);
        }
    };
    
    const handleIconClick = () => {
        setSearchText(localText);
    };

    return(
        <div className={Styles.yearContainer}>
            <label htmlFor='yearInput'>Data de lançamento</label>
            <div className={Styles.yearInputContainer}>
                
                <input type="text" name='yearInput' 
                    placeholder='Digite o ano e pressione Enter'
                    value={localText}
                    onChange={(e) => setLocalText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <figure onClick={handleIconClick} style={{cursor: 'pointer'}}>
                    <img src={Lupa} alt='Ícone de lupa'></img>
                </figure>
            </div>
        </div>
    )
};

export default YearInput;