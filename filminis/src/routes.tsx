
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import AboutUs from './pages/AboutUs';
import LoginPage from './pages/Login';
import Search from './pages/Search';
import Movies from './pages/Movies';

function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about-us" element={<AboutUs/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path='/search' element={<Search/>} />
            <Route path='/movies' element={<Movies/>} />
        </Routes>
    )
}

export default AppRoutes;