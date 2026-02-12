import Styles from './NavigationDot.module.css'

type NavigationDotProps = {
    active: boolean;
}
function NavigationDot({active}: NavigationDotProps){
    return(
        <div className={`${Styles.NavigationDot} ${active ? Styles.active : ''}`}>
        </div>
    )
}

export default NavigationDot;