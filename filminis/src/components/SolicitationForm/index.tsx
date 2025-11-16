import { useState } from 'react';
import styles from './SolicitationForm.module.css';

import FormTitleIcon from '../FormTitleIcon';
import FormRegistrationContainer from '../FormRegistrationContainer';
import PreviewContainer from '../PreviewContainer'; 

function SolicitationForm(){
    
    const [posterUrl, setPosterUrl] = useState('');
    const [capaUrl, setCapaUrl] = useState('');

    return(
        <div className={styles.solicitationForm}>
            <FormTitleIcon
                formTitle="Formulário de novo filme"
                formComponent={
                    <FormRegistrationContainer 
                        onPosterUrlChange={setPosterUrl}
                        onCapaUrlChange={setCapaUrl}
                    />
                }
                
                previewComponent={
                    <PreviewContainer 
                        posterUrl={posterUrl}
                        capaUrl={capaUrl}
                    />
                }
            />
        </div>
    )
};

export default SolicitationForm;