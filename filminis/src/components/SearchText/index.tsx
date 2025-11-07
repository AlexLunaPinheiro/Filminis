import './SearchText.module.css'

type SearchTextProps = {
    text: string
}

function SearchText({text}: SearchTextProps){
    return(
        <h1>{text}</h1>
    )
}

export default SearchText;

