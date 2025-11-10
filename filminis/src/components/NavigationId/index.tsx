import Styles from './NavigationId.module.css'
import NavigationDot from '../NavigationDot'

type NavigationIdProps = {
    totalItems: number;
    currentIndex: number;
}

function NavigationId({ totalItems, currentIndex }: NavigationIdProps){
    return(
        <div className={Styles.NavigationIdContainer}>
    
            {Array.from({ length: totalItems }).map((_, index) => (
                <NavigationDot 
                    key={index}
                    active={index === currentIndex}
                />
            ))}
        </div>
    )
}

export default NavigationId;