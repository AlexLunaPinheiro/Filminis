import { useState } from 'react';
import React from 'react'; 
import styles from './FormTitleIcon.module.css';

type ActiveView = 'form' | 'preview';

type FormTitleIconProps = {
    formTitle: string; 
    formComponent: React.ReactNode; 
    previewComponent: React.ReactNode; 
}

function FormTitleIcon({ formTitle, formComponent, previewComponent }: FormTitleIconProps) {

    const [activeView, setActiveView] = useState<ActiveView>('form');

    return (
        <>    
            <div className={styles.toggleContainer}>
                
                <div 
                    className={`${styles.highlightPill} ${activeView === 'preview' ? styles.slideRight : ''}`} 
                />

                <button 
                    type="button" 
                    onClick={() => setActiveView('form')}
                    className={`${styles.toggleButton} ${styles.formButton} ${activeView === 'form' ? styles.textActive : ''}`}
                >
                    {formTitle}
                </button>
                
                <button 
                    type="button" 
                    onClick={() => setActiveView('preview')}
                    className={`${styles.toggleButton} ${styles.previewButton} ${activeView === 'preview' ? styles.textActive : ''}`}
                >
                    Preview
                </button>
            </div>

            <div className={styles.contentContainer}>
                {activeView === 'form' && formComponent}
                {activeView === 'preview' && previewComponent}
            </div>
        </>
    );
}

export default FormTitleIcon;