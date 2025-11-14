import CategoryFilterContainer from "../../components/CategoryFilterContainer";
import FilterInput from "../../components/FilterInput";
import ButtonFilter from "../../components/ButtonFilter";
import MovieBanner from "../../components/MovieBanner";
import SearchText from "../../components/SearchText";
import Navbar from "../../components/NavBar";
import Teste from "../../assets/images/Requiem-Para-Um-Sonho.png"
import { useState } from "react";
import styles from './SearchPage.module.css'
import Footer from "../../components/Footer";

function Search(){
    const [searchContent, setSearchContent] = useState("")

    return(
        <div className={styles.searchContainer}>
            <header>
                <Navbar variant="solid"/>
            </header>

            <main className={styles.searchMain}>
                <aside>
                    <FilterInput setSearchText={setSearchContent}/>
                    <CategoryFilterContainer/>
                </aside>
                <section className={styles.searchResults}>
                    <SearchText text={searchContent}/>
                    <div className={styles.resultGrid}>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                        <MovieBanner imageLink={Teste}/>
                    </div>
                    
                </section>
                
            </main>

            <Footer variant="max"/>
            
        </div>
        
    )
};

export default Search;