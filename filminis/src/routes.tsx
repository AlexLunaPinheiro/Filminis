
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import AboutUs from './pages/AboutUs';
import LoginPage from './pages/Login';
import Search from './pages/Search';
import Movies from './pages/Movies';
import Profile from './pages/Profile';
import Solicitation from './pages/Solicitation';

function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about-us" element={<AboutUs/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path='/search' element={<Search/>} />
            <Route path='/movies' element={<Movies/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/solicitation' element={<Solicitation/>}/>
        </Routes>
    )
}

export default AppRoutes;