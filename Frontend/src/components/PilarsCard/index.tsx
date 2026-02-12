import './PilarsCard.css'


type PilarsCardProps = {
    iconLink: string,
    title: string,
    text: string
}

function PilarsCard({iconLink, title, text}: PilarsCardProps){
    return(
        <article className="Card">
            <div className='pilarInfoContainer'>
                <div className='pilarContainer'>
                    <figure>
                        <img src={iconLink} alt={`icone de ${title}`}></img>
                    </figure>
                    <h1>{title}</h1>
                </div>
                
                <p>{text}</p>
            </div>
            
        </article>
    )
};

export default PilarsCard;