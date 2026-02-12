import Styles from './MovieCategory.module.css'

type MovieCategoryProps = {
    imageLink: string,
    title: string
}

function MovieCategory ({imageLink, title}: MovieCategoryProps){
    return(
        <article className={Styles.categoryCard }>
            <figure>
                <img src={imageLink} alt={`Categoria ${title}`}></img>
            </figure>
            <h1>{title}</h1>
        </article>
    )
}

export default MovieCategory;