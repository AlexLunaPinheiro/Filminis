import styles from './AboutUs.module.css'
import Navbar from '../../components/NavBar';
import AboutUsHeroBackground from '../../components/AboutUsHeroBackground';
import PilarsCard from '../../components/PilarsCard';
import DevsCard from '../../components/DevsCard';
import SeparatedInput from '../../components/SeparatedInput';
import ButtonGeneric from '../../components/ButtonGeneric';
import Footer from '../../components/Footer';

import Roque from '../../assets/images/Vitor-Roque.jpg'
import Negan from '../../assets/images/Negan.jpg'
import Dava from '../../assets/images/Dava-Jonas.jpg'
import Missao from '../../assets/icons/Acao.png'
import Visao from '../../assets/icons/Visao.png'
import Valores from '../../assets/icons/Valores.png'

function AboutUs() {
  return (
    <div className={styles.AboutUsContainer}>
      <header className={styles.aboutUsHeader}>
        <Navbar variant='solid'/>
      </header>

      <main className={styles.aboutUsMain}>
        <AboutUsHeroBackground/>
        <p className={styles.description}>Oferecemos as informações de mais de 10 filmes em nosso catálogo, navegando entre gêneros como ação, terror, aventura, drama e muito mais</p>

        <section className={styles.pilarsSection}>
          <PilarsCard iconLink={Missao} title='Missão' text='Buscamos nos tornar referência no mercado nacional de wiki de filmes'/>
          <PilarsCard iconLink={Visao} title='Visão' text='sdadasfyavfgavsdfgaysfasdasdasdasdasdasd'/>
          <PilarsCard iconLink={Valores} title='Valores' text='sdadasfyavfgavsdfgaysf'/>
        </section>

        <div className={styles.aboutTitle}>
          <h1>Nossos</h1>
          <h1 className={styles.variant}>Desenvolvedores</h1>
        </div>
        

        <section className={styles.devsSections}>
          <DevsCard nome='Alex' imgPerfil={Roque} funcao='BackEnd' altText='Imagem do desenvolvedor'/>
          <DevsCard nome='Luna' imgPerfil={Negan} funcao='UI/UX' altText='Imagem do desenvolvedor'/>
          <DevsCard nome='Pinheiro' imgPerfil={Dava} funcao='FrontEnd' altText='Imagem do desenvolvedor'/>
        </section>

        <div className={styles.aboutTitle}>
          <h1>Entre em</h1>
          <h1 className={styles.variant}>Contato</h1>
        </div>  

        <SeparatedInput label="Seu nome completo:" placeholder='Digite seu nome completo' variant='base'/>
        <SeparatedInput label="Mensagem:" placeholder='Digite sua mensagem' variant='textBox'/>

        <ButtonGeneric variant='min'>Enviar Mensagem</ButtonGeneric>

        
      </main>

      <Footer variant='max'/>
    </div>
  );
};

export default AboutUs;
