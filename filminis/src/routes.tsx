import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import AboutUs from './pages/AboutUs';
import LoginPage from './pages/Login';
import Search from './pages/Search';
import Movies from './pages/Movies';
import Profile from './pages/Profile';
import Solicitation from './pages/Solicitation';
import Dashboard from './pages/Dashboard'; // 1. Importe a nova página

function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about-us" element={<AboutUs/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path='/search' element={<Search/>} />
            <Route path='/movies/:id' element={<Movies/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/solicitation' element={<Solicitation/>}/>

            <Route path="/admin" element={<Dashboard />} />

        </Routes>
    )
}

export default AppRoutes;