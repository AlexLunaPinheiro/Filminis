import './MovieCategory.css'

type MovieCategoryProps = {
    imageLink: string,
    title: string
}

function MovieCategoryModal ({imageLink, title}: MovieCategoryProps){
    return(
        <article>
            <figure>
                <img src={imageLink}></img>
            </figure>
            <h1>{title}</h1>
        </article>
    )
}

export default MovieCategoryModal;