import Styles from './ButtonHome.module.css'

type ButtonHomeProps = {
    text: string
}

function ButtonHome({text}: ButtonHomeProps){
    return(
        <button className={Styles.ButtonHome}>
            {text}
        </button>
    )
};

export default ButtonHome;