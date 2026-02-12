import './NavigationItem.css';

type NavigationItemProps = {
    title: string,
    imagem: string | React.ReactNode,
    active: string
};

function NavigationItem ({title, imagem, active}: NavigationItemProps){
  return (
    <div className={`navItem ${active}`}>
        <p>{title}</p>
        <figure>
          {typeof imagem === "string"?(
            <img src={imagem} alt={`Icone da navbar ${title}`}></img>
          ):
            imagem
          }
            
        </figure>
    </div>

  );
};

export default NavigationItem;