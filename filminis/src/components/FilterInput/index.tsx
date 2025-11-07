import Lupa from '../../assets/icons/Lupa.png'
import Styles from './FilterInput.module.css'

function FilterInput(){
    return(
        <div className={Styles.FilterInputContainer}>
            <label htmlFor='filterInput'>Pesquisa</label>
            <div className={Styles.ButtonContainer}>
                <input type="text" name='filterInput' 
                placeholder='Digite o filme, ator...que você procura'>
                </input>
                <figure>
                    <img src={Lupa} alt='Ícone de lupa'></img>
                </figure>
            </div>
            
            
        </div>
    )
};

export default FilterInput;