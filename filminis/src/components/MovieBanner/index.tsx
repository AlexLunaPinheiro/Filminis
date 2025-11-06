import './MovieBanner.module.css'

type MovieBannerProps = {
    imageLink: string,
}

function MovieBanner({imageLink}: MovieBannerProps){
    return(
        <article className='card'>

            <figure className='image-container'>
                <img src={imageLink} alt="Imagem do banner do filme"></img>
            </figure>
            
        </article>
    )
}

export default MovieBanner;