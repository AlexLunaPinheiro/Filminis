import styles from './DataShowTemplate.module.css';
import React from 'react';

type DataShowTemaplateProps ={
    children: React.ReactNode;
};

function DataShowTemplate({children}:DataShowTemaplateProps){
    return(
        <section className={styles.DataTemplate}>
            {children}
        </section>
    )
}

export default DataShowTemplate;