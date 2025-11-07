import './NavigationItem.css';

type NavigationItemProps = {
    caminho: string,
    title: string,
    imagem: string,
};

function NavigationItem ({caminho, title, imagem}: NavigationItemProps){
  return (
    <a href={caminho}>
        <p>{title}</p>
        <figure>
            <img src={imagem} alt={`Icone da navbar ${title}`}></img>
        </figure>
    </a>

  );
};

export default NavigationItem;