import Lupa from '../../assets/icons/Lupa.png'
import Styles from './FilterInput.module.css'
import { useState } from 'react'; // 1. Importar

type FilterInputProps = {
    initialValue: string;
    setSearchText: (text: string) => void;
};

function FilterInput({ initialValue, setSearchText }: FilterInputProps){
    // 2. Estado local para digitação
    const [localText, setLocalText] = useState(initialValue);

    // 3. Atualizar o pai (SearchPage) apenas ao pressionar Enter
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setSearchText(localText);
        }
    };
    
    // 4. Ou ao clicar na Lupa
    const handleIconClick = () => {
        setSearchText(localText);
    };

    return(
        <div className={Styles.FilterInputContainer}>
            <label htmlFor='filterInput'>Pesquisa</label>
            <div className={Styles.ButtonContainer}>
                <input type="text" name='filterInput' 
                    placeholder='Digite o filme, ator... e pressione Enter'
                    value={localText} // 5. Controlar o input
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

export default FilterInput;