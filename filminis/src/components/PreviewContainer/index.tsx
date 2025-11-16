import styles from './PreviewContainer.module.css';
import ButtonGeneric from '../ButtonGeneric';

type PreviewContainerProps = {
    posterUrl: string;
    capaUrl: string;
}

function PreviewContainer({ posterUrl, capaUrl }: PreviewContainerProps){
    return(
        <div className={styles.previewContainer}>
            <h2>Preview:</h2>
            <section className={styles.imagePreview}>

                <div className={styles.posterSection}>
                    <p>Poster</p>
                    <div className={styles.poster}>
                        {posterUrl && (
                            <img src={posterUrl} alt="preview do poster" />
                        )}
                    </div>
                </div>

                <div className={styles.bannerSection}>
                    <p>Capa</p>
                    <div className={styles.banner}>
                        {capaUrl && (
                            <img src={capaUrl} alt="preview do banner" />
                        )}
                    </div>
                </div>

            </section>
            <div className={styles.submitButtonContainer}>
                <ButtonGeneric variant='max'>ENVIAR SOLICITAÇÃO DE CRIAÇÃO DO FILME</ButtonGeneric>
            </div>
        </div>
    );
};

export default PreviewContainer;