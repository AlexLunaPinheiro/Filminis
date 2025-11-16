import styles from './SolicitationForm.module.css';

import FormTitleIcon from '../FormTitleIcon';
import FormRegistrationContainer from '../FormRegistrationContainer';

function SolicitationForm(){

    return(
        <form typeof='submit' className={styles.solicitationForm}>
            <FormTitleIcon
                formTitle="Formulário de novo filme"
                formComponent={<FormRegistrationContainer />}
                previewComponent={<FormRegistrationContainer />}
            />
        </form>
    )
};

export default SolicitationForm;