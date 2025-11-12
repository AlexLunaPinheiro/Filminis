import Styles from './FormTitleIcon.module.css';

type FormTitleIconProps = {
    text: string,
    variant?: 'min' | 'max'
}

function FormTitleIcon ({text, variant='min'}: FormTitleIconProps){
    return(
        <div className={`${Styles.container} ${Styles[variant]}`}>
            <div className={Styles.formIcon}>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default FormTitleIcon;