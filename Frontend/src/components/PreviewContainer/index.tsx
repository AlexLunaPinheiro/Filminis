import styles from './PreviewContainer.module.css';
import ButtonGeneric from '../ButtonGeneric';


type PreviewContainerProps = {
    posterUrl: string;
    capaUrl: string;
    filmeParaEditar?: any; 
}

function PreviewContainer({ posterUrl, capaUrl, filmeParaEditar }: PreviewContainerProps){
    
 
    const handleSubmit = () => {
        alert("O submit deve ser feito pelo formulário, não pelo preview.");
    };

    return(
        <div className={styles.previewContainer}>
            <h2>Preview:</h2>
            <section className={styles.imagePreview}>

                <div className={styles.posterSection}>
                    <p>Poster</p>
                    <div className={styles.poster}>
                        {posterUrl ? (
                            <img src={posterUrl} alt="preview do poster" />
                        ) : <p>Preview da Imagem do poster estará aqui</p>}
                    </div>
                </div>

                <div className={styles.bannerSection}>
                    <p>Capa</p>
                    <div className={styles.banner}>
                        {capaUrl ? (
                            <img src={capaUrl} alt="preview do banner" />
                        ) : <p>Preview da Imagem do banner estará aqui</p>}
                    </div>
                </div>

            </section>
            <div className={styles.submitButtonContainer}>
                <ButtonGeneric 
                    variant='max' 
                    onClick={handleSubmit}
                    disabled={true} 
                >
                    {filmeParaEditar ? 'ENVIAR SOLICITAÇÃO DE EDIÇÃO' : 'ENVIAR SOLICITAÇÃO DE CRIAÇÃO'}
                </ButtonGeneric>
                <p>
                    (Volte para a aba de formulario para enviar)
                </p>
            </div>
        </div>
    );
};

export default PreviewContainer;