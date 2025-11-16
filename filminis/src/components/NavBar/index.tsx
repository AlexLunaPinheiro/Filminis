import './Navbar.css';
import { Link, useLocation, useNavigate} from 'react-router-dom';

import Logo from '../../assets/icons/Logo.png';
import HomeIcon from '../../assets/icons/Home.png';
import Filme from '../../assets/icons/Filmes.png'
import SolicitacoesIcon from '../../assets/icons/Solicitacoes.png'
import SobreNos from '../../assets/icons/Informacoes.png'
import Pesquisa from '../../assets/icons/Pesquisa.png'
import NavigationItem from '../NavigationItem';
import UserIcon from '../UserIcon';

type NavBarProps={
  variant?: "transparent" | "solid";
};


const isUserLoggedIn = true; 

function Navbar ({variant}: NavBarProps){
  const location = useLocation();
  const navigate = useNavigate();

   const goToSolicitacoes = () => {
        navigate("/profile", {
            state: { activeView: "solicitacoes" }
        });
    };


  const isProfileActive = location.pathname === "/login" || location.pathname === "/profile";

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
          <Link 
            to="/profile" 
            state={{ activeView: "solicitacoes" }}
          >
            <NavigationItem
                title="SOLICITAÇÕES"
                imagem={SolicitacoesIcon}
                active={location.pathname === "/profile" ? "active" : ""}
            />
          </Link>
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

  
        <li id="profile">
  
          <Link to={isUserLoggedIn ? "/profile" : "/login"}>
            <NavigationItem 
              title="PERFIL" 
              imagem={<UserIcon/>} 
              active={isProfileActive ? "active" : ""}
            />
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;