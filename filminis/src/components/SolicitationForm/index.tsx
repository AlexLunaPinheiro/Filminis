import { useState } from 'react';
import styles from './SolicitationForm.module.css';
import { useLocation } from 'react-router-dom'; 

import FormTitleIcon from '../FormTitleIcon';
import FormRegistrationContainer from '../FormRegistrationContainer';
import PreviewContainer from '../PreviewContainer'; 

function SolicitationForm(){
    const location = useLocation(); 

    const filmeParaEditar = location.state?.filmeParaEditar; 
    
    const [posterUrl, setPosterUrl] = useState(filmeParaEditar?.url_poster || '');
    const [capaUrl, setCapaUrl] = useState(filmeParaEditar?.url_capa || '');

    return(
        <div className={styles.solicitationForm}>
            <FormTitleIcon
                formTitle={filmeParaEditar ? "Formulário de edição" : "Formulário de novo filme"}
                formComponent={
                    <FormRegistrationContainer 
                        onPosterUrlChange={setPosterUrl}
                        onCapaUrlChange={setCapaUrl}
                        filmeParaEditar={filmeParaEditar} 
                    />
                }
                
                previewComponent={
                    <PreviewContainer 
                        posterUrl={posterUrl}
                        capaUrl={capaUrl}
                
                        filmeParaEditar={filmeParaEditar} 
                    />
                }
            />
        </div>
    )
};

export default SolicitationForm;