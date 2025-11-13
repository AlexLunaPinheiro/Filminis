import './NavigationItem.css';

type NavigationItemProps = {
    title: string,
    imagem: string | React.ReactNode,
    active: string
};

function NavigationItem ({title, imagem, active}: NavigationItemProps){
  return (
    <a className={`navItem ${active}`}>
        <p>{title}</p>
        <figure>
          {typeof imagem === "string"?(
            <img src={imagem} alt={`Icone da navbar ${title}`}></img>
          ):
            imagem
          }
            
        </figure>
    </a>

  );
};

export default NavigationItem;