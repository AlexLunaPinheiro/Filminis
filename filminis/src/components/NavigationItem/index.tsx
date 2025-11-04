import './NavigationItem.css';

type NavigationItemProps = {
    caminho: string,
    title: string,
    imagem: string,
    altText: string
};

function NavigationItem ({caminho, title, imagem, altText}: NavigationItemProps){
  return (
    <a href={caminho}>
        <p>{title}</p>
        <figure>
            <img src={imagem} alt={altText}></img>
        </figure>
    </a>

  );
};

export default NavigationItem;