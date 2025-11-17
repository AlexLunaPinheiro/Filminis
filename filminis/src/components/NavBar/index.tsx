import './Navbar.css';
import { Link, useLocation, useNavigate} from 'react-router-dom';

import Logo from '../../assets/icons/Logo.png';
import HomeIcon from '../../assets/icons/Home.png';
import Filme from '../../assets/icons/Filmes.png'
import SolicitacoesIcon from '../../assets/icons/Solicitacoes.png'
import SobreNos from '../../assets/icons/Informacoes.png'
import Pesquisa from '../../assets/icons/Pesquisa.png'
import UserIcon from '../UserIcon'; // (Para o usuário)
import LogoutImage from '../../assets/icons/Sair.png'; // (Para o admin)
import DashImage from '../../assets/icons/Dashboard.png'; // (Para o admin)

import { useAuth } from '../../context/auth_context';
import NavigationItem from '../NavigationItem'; // (Importe o NavigationItem)

type NavBarProps={
  variant?: "transparent" | "solid";
};

function Navbar ({variant}: NavBarProps){
  const location = useLocation();
  const navigate = useNavigate();
  
  const { isLoggedIn, user, logout } = useAuth(); 
  const isAdmin = user?.role === 'ADMIN';

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  const isProfileActive = location.pathname === "/login" || location.pathname === "/profile";
  const isFilmesActive = location.pathname.startsWith("/movies") || location.pathname === "/search";

  return (
    <nav className={`navbar ${variant}`}>
      <figure>
        <img src={Logo} alt="Logo do site"></img>
      </figure>

      {isAdmin ? (
        // --- ADMIN ---
        <ul className="nav-links">
          <li>
            <Link to="/admin">
              <NavigationItem 
                title="DASHBOARD" 
                imagem={<img src={DashImage} alt="Dashboard" />} 
                active={location.pathname === "/admin" ? "active" : ""}
              />
            </Link>
          </li>
          <li>
            <Link to="/search">
              <NavigationItem 
                title="PESQUISA" 
                imagem={<img src={Pesquisa} alt="Pesquisa" />} 
                active={location.pathname === "/search" ? "active" : ""}
              />
            </Link>
          </li>
          <li>
            <Link to="/search"> 
              <NavigationItem 
                title="FILMES" 
                imagem={<img src={Filme} alt="Filmes" />} 
                active={isFilmesActive ? "active" : ""}
              />
            </Link>
          </li>
          
          <li id="profile" onClick={handleLogout} style={{cursor: 'pointer'}}>
            <div className="nav-link-wrapper"> 
              <NavigationItem 
                title={"LOGOUT"}
                imagem={<img src={LogoutImage} alt="Logout" />} 
                active={""} 
              />
            </div>
          </li>
        </ul>

      ) : (

        // --- USUÁRIO ---
        <ul className="nav-links">
          <li>
            <Link to="/">
              <NavigationItem 
                title="HOME" 
                imagem={<img src={HomeIcon} alt="Home" />} 
                active={location.pathname === "/" ? "active" : ""}
              />
            </Link>
          </li>

          {isLoggedIn && (
            <li>
              <Link 
                to="/profile" 
                state={{ activeView: "solicitacoes" }}
              >
                <NavigationItem
                  title="SOLICITAÇÕES"
                  imagem={<img src={SolicitacoesIcon} alt="Solicitações" />}
                  active={location.pathname === "/profile" && location.state?.activeView === "solicitacoes" ? "active" : ""}
                />
              </Link>
            </li>
          )}

          <li>
            <Link to="/about-us">
              <NavigationItem 
                title="SOBRE NÓS" 
                imagem={<img src={SobreNos} alt="Sobre Nós" />} 
                active={location.pathname === "/about-us" ? "active" : ""}
              />
            </Link>
          </li>
          <li>
            <Link to="/search">
              <NavigationItem 
                title="PESQUISA" 
                imagem={<img src={Pesquisa} alt="Pesquisa" />} 
                active={location.pathname === "/search" ? "active" : ""}
              />
            </Link>
          </li>
          
          <li>
            <Link to="/search"> 
              <NavigationItem 
                title="FILMES" 
                imagem={<img src={Filme} alt="Filmes" />} 
                active={isFilmesActive ? "active" : ""}
              />
            </Link>
          </li>
          
          <li id="profile">
            <Link to={isLoggedIn ? "/profile" : "/login"}>
              <NavigationItem 
                title={isLoggedIn ? "PERFIL" : "LOGIN"}
                imagem={<UserIcon/>} 
                active={isProfileActive ? "active" : ""}
              />
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;