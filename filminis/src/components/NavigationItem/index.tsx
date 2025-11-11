import './NavigationItem.css';

type NavigationItemProps = {
    title: string,
    imagem: string,
    active: string
};

function NavigationItem ({title, imagem, active}: NavigationItemProps){
  return (
    <a className={`navItem ${active}`}>
        <p>{title}</p>
        <figure>
            <img src={imagem} alt={`Icone da navbar ${title}`}></img>
        </figure>
    </a>

  );
};

export default NavigationItem;