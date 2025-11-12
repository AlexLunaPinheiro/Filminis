
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import AboutUs from './pages/AboutUs';
import LoginPage from './pages/Login';
import Search from './pages/Search';

function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about-us" element={<AboutUs/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path='/search' element={<Search/>} />
        </Routes>
    )
}

export default AppRoutes;