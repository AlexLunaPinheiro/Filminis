import styles from './SearchText.module.css'

type SearchTextProps = {
    text: string
}

function SearchText({text}: SearchTextProps){
    return(
        <h1 className={styles.textSearch}>Resultados para "{text}":</h1>
    )
}

export default SearchText;

