import './DevsCard.css'
import Github from '../../assets/icons/Github.png'

type DevsCardProps={
    nome: string,
    imgPerfil: string,
    altText: string,
    funcao: string

}

function DevsCard({nome, imgPerfil, funcao, altText}: DevsCardProps){
    return(
        <article className="card-dev">
            <div className='container-nome'>
                <p>{nome}</p>
                <figure>
                    <img src={Github} alt='icone do github'></img>
                </figure>
            </div>
            <figure>    
                <img src={imgPerfil} alt={altText} id="img-dev"></img>
            </figure>
            <div className='container-funcao'>
                <p>{funcao}</p>
            </div>
            
        </article>
    )
};

export default DevsCard;