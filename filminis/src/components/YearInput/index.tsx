import Lupa from '../../assets/icons/Lupa.png'
import Styles from './YearInput.module.css'



function YearInput({setSearchText}: any){
    return(
        <div className={Styles.yearContainer}>
            <label htmlFor='yearInput'>Data de lançamento</label>
            <div className={Styles.yearInputContainer}>
                
                <input type="text" name='yearInput' 
                placeholder='Digite o ano de lançamento'
                onChange={(e) => setSearchText(e.target.value)}>
                </input>

                <figure>
                    <img src={Lupa} alt='Ícone de lupa'></img>
                </figure>
            </div>
            
            
        </div>
    )
};

export default YearInput;