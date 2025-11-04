import './Navbar.css';
import Logo from '../../assets/icons/Logo.png';
import HomeIcon from '../../assets/icons/Home.png';
import SolicitacoesIcon from '../../assets/icons/Solicitacoes.png'
import SobreNos from '../../assets/icons/Informacoes.png'
import Pesquisa from '../../assets/icons/Pesquisa.png'
import NavigationItem from '../NavigationItem';

function Navbar (){
  return (
    <nav className="navbar">
      <figure>
        <img src={Logo} alt="Logo do site"></img>
      </figure>

      <ul className="nav-links">
        
        <li>
            <NavigationItem 
                caminho="/home" 
                title="HOME" 
                imagem={HomeIcon} 
                altText="Icone da Home" 
            />
        </li>

        <li>
            <NavigationItem 
                caminho="/solicitacoes" 
                title="SOLICITAÇÕES" 
                imagem={SolicitacoesIcon} 
                altText="Icone de solicitação" 
            />
        </li>

        <li>
            <NavigationItem 
                caminho="/sobrenos" 
                title="SOBRE NÓS" 
                imagem={SobreNos} 
                altText="Icone de solicitação" 
            />
        </li>

        <li>
            <NavigationItem 
                caminho="/pesquisa" 
                title="PESQUISA" 
                imagem={Pesquisa} 
                altText="Icone de pesquisa" 
            />
        </li>

      </ul>

    </nav>

  );
};

export default Navbar;
