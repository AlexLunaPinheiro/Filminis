//import DevsCard from "./components/DevsCard";
//import PilarsCard from "./components/PilarsCard";
//import RegistrationPage from './pages/RegistrationPage';
//import Foto from "./assets/images/Vitor-Roque.jpg"
//import AboutUsHeroBackground from "./components/AboutUsHeroBackground";
//import MovieCategoryModal from "./components/MovieCategory";
//import Jason from "./assets/images/Jason.png"
import ImageCardMovie from "./assets/images/Hellboy.png"
//import MovieCard from "./components/MovieCard";
//import ActionMovieCard from "./components/ActionMoviesCard";
//import Chilgurn from "./assets/images/Chilgurn.png"
//import CastCard from "./components/CastCard";
//import PornActor from "./assets/images/Ator.png"
//import Diretor from './assets/images/StanleyKubrick.png'
//import DirectorCard from './components/DirectorCard';
import MovieBanner from "./components/MovieBanner";

function App() {
  //return <RegistrationPage />;
  //return <DevsCard nome={"Alex"} imgPerfil={Foto} funcao={"Dev Backend"} altText={"imagem do desenvolvedor"} />
  //return <AboutUsHeroBackground/>;
  //return <MovieCategoryModal title="HORROR" imageLink={Jason}/>
  //return <MovieCard imageLink={ImageCardMovie} title="REQUIEM PARA UM SONHO" produtora="Warner Bros" ano="2001"/>
  //return <ActionMovieCard imageLink={Chilgurn} titulo="Onde os fracos não tem vez" duracao="02:30:03"/>
  //return <CastCard imageLink={PornActor} nome="Keir Dullea"/>
  //return <DirectorCard imageLink={Diretor} nome="Stanley Kubrick"/>
  return <MovieBanner imageLink={ImageCardMovie}/>
}

export default App;