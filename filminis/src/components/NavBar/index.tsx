import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/icons/Logo.png';
import HomeIcon from '../../assets/icons/Home.png';
import Filme from '../../assets/icons/Filmes.png'
import SolicitacoesIcon from '../../assets/icons/Solicitacoes.png'
import SobreNos from '../../assets/icons/Informacoes.png'
import Pesquisa from '../../assets/icons/Pesquisa.png'
import NavigationItem from '../NavigationItem';

type NavBarProps={
  variant?: "transparent" | "solid";
};

function Navbar ({variant}: NavBarProps){
  const location = useLocation();

  return (
    <nav className={`navbar ${variant}`}>
      <figure>
        <img src={Logo} alt="Logo do site"></img>
      </figure>

      <ul className="nav-links">
        
        <li>
          <Link to="/">
            <NavigationItem 
                title="HOME" 
                imagem={HomeIcon} 
                active={location.pathname === "/" ? "active" : ""}
            />
          </Link>
            
        </li>

        <li>
          <NavigationItem 
              title="SOLICITAÇÕES" 
              imagem={SolicitacoesIcon} 
              active={location.pathname === "/solicitacoes" ? "active" : ""}
          />
        </li>

        <li>
          <Link to="/about-us">
              <NavigationItem 
                  title="SOBRE NÓS" 
                  imagem={SobreNos} 
                  active={location.pathname === "/about-us" ? "active" : ""}
              />
            </Link>
        </li>

        <li>
          <Link to="/search">
            <NavigationItem 
                title="PESQUISA" 
                imagem={Pesquisa} 
                active={location.pathname === "/search" ? "active" : ""}
            />
          </Link>
            
        </li>

        <li>
          <Link to="/movies">
            <NavigationItem 
                title="FILMES" 
                imagem={Filme} 
                active={location.pathname === "/movies" ? "active" : ""}
            />
          </Link>
            
        </li>

        <li>
          <Link to="/login">
            <NavigationItem 
              title="PERFIL" 
              imagem={Pesquisa} 
              active={location.pathname === "/login" ? "active" : ""}
            />
          </Link>
        </li>

      </ul>

    </nav>

  );
};

export default Navbar;
