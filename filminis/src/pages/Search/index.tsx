import CategoryFilterContainer from "../../components/CategoryFilterContainer";
import FilterInput from "../../components/FilterInput";
import ButtonFilter from "../../components/ButtonFilter";
import MovieBanner from "../../components/MovieBanner";
import SearchText from "../../components/SearchText";
import Navbar from "../../components/NavBar";
import Teste from "../../assets/images/Requiem-Para-Um-Sonho.png"
import { useState } from "react";
import styles from './SearchPage.module.css'

function Search(){
    const [searchContent, setSearchContent] = useState("")

    return(
        <div className={styles.searchContainer}>
            <header>
                <Navbar/>
            </header>

            <main>
                <aside>
                    <FilterInput setSearchText={setSearchContent}/>
                    <div className={styles.filterButtonGroup}>
                        <ButtonFilter text="Diretor"/>
                        <ButtonFilter text="Diretor"/>
                        <ButtonFilter text="Diretor"/>
                    </div>
                    <CategoryFilterContainer/>
                </aside>
                <section className={styles.searchResults}>
                    <SearchText text={searchContent}/>
                    <MovieBanner imageLink={Teste}/>
                </section>
                
            </main>
            
        </div>
        
    )
};

export default Search;