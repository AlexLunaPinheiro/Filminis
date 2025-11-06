//import DevsCard from "./components/DevsCard";
//import PilarsCard from "./components/PilarsCard";
//import RegistrationPage from './pages/RegistrationPage';
//import Foto from "./assets/images/Vitor-Roque.jpg"
//import AboutUsHeroBackground from "./components/AboutUsHeroBackground";
//import MovieCategoryModal from "./components/MovieCategory";
//import Jason from "./assets/images/Jason.png"
import ImageCardMovie from "./assets/images/Requiem-Para-Um-Sonho.png"
import MovieCard from "./components/MovieCard";

function App() {
  //return <RegistrationPage />;
  //return <DevsCard nome={"Alex"} imgPerfil={Foto} funcao={"Dev Backend"} altText={"imagem do desenvolvedor"} />
  //return <AboutUsHeroBackground/>;
  //return <MovieCategoryModal title="HORROR" imageLink={Jason}/>
  return <MovieCard imageLink={ImageCardMovie} title="Requiem para um sonho" produtora="Warner Bros" ano="2001"/>
}

export default App;