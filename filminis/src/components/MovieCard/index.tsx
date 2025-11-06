import './MovieCard.module.css'

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
                <img src={imageLink} alt="Imagem do poster do filme"></img>
            </figure>
            <div className='info-container'>
                <h1>{title}</h1>
                <div className='desc'>
                    <p>{produtora}</p>
                    <p>{ano}</p>
                </div>
            </div>
            
        </article>
    )
}

export default MovieCard;