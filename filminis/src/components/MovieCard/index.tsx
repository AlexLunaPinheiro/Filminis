import './MovieCard.css'

type MovieCardProps = {
    imageLink: string,
    title: string,
    produtora: string,
    ano: string
}

function MovieCard ({imageLink, title, produtora, ano}: MovieCardProps){
    return(
        <article>
            <figure>
                <img src={imageLink}></img>
            </figure>
            <h1>{title}</h1>
            <p>{produtora}</p>
            <p>{ano}</p>
        </article>
    )
}

export default MovieCard;