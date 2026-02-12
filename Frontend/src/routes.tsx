import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import AboutUs from './pages/AboutUs';
import LoginPage from './pages/Login';
import Search from './pages/Search';
import Movies from './pages/Movies';
import Profile from './pages/Profile';
import Solicitation from './pages/Solicitation';
import Dashboard from './pages/Dashboard'; 

// 1. IMPORTE A NOVA PÁGINA
import AdminFormPage from './pages/AdminFormPage';

function AppRoutes(){
    return(
        <Routes>
            {/* --- Rotas Públicas e de Usuário --- */}
            <Route path="/" element={<Home/>} />
            <Route path="/about-us" element={<AboutUs/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path='/search' element={<Search/>} />
            <Route path='/movies/:id' element={<Movies/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/solicitation' element={<Solicitation/>}/>

            {/* --- Rotas de Admin --- */}
            <Route path="/admin" element={<Dashboard />} />
            
            {/* 2. ADICIONE AS NOVAS ROTAS DE FORMULÁRIO DO ADMIN */}
            <Route path="/admin/filmes/novo" element={<AdminFormPage />} />
            <Route path="/admin/filmes/editar/:id" element={<AdminFormPage />} />

        </Routes>
    )
}

export default AppRoutes;