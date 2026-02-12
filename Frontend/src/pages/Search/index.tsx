import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // Para ler a URL
import styles from './SearchPage.module.css';

import CategoryFilterContainer from "../../components/CategoryFilterContainer";
import FilterInput from "../../components/FilterInput";
import MovieBanner from "../../components/MovieBanner";
import SearchText from "../../components/SearchText";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";

import { searchFilmes } from "../../services/interceptors/movie_interceptor";
import type { FilmeListado } from "../../services/interceptors/movie_interceptor";

function Search(){
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Estados
    const [searchText, setSearchText] = useState(searchParams.get('nome') || "");
    const [selectedGeneros, setSelectedGeneros] = useState<string[]>(searchParams.getAll('genero') || []);
    const [selectedDate, setSelectedDate] = useState(searchParams.get('data') || "");
    
    const [results, setResults] = useState<FilmeListado[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //  Função para buscar
    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        
        // Montar objeto de filtros
        const filters: Record<string, string | string[]> = {};
        if (searchText) filters.nome = searchText; // O backend filtra por nome, ator ou diretor
        if (selectedDate) filters.data = selectedDate;
        if (selectedGeneros.length > 0) filters.genero = selectedGeneros;

        // Atualizar a URL
        setSearchParams(filters);

        try {
            const data = await searchFilmes(filters);
            setResults(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [searchText, selectedGeneros, selectedDate]); // Dependências

    const handleGenreChange = (genero: string, isChecked: boolean) => {
        setSelectedGeneros(prev => 
            isChecked ? [...prev, genero] : prev.filter(g => g !== genero)
        );
    };

    return(
        <div className={styles.searchContainer}>
            <header>
                <Navbar variant="solid"/>
            </header>

            <main className={styles.searchMain}>
                <aside>
                    <FilterInput 
                        initialValue={searchText}
                        setSearchText={setSearchText} 
                    />
                    <CategoryFilterContainer 
                        selectedGeneros={selectedGeneros}
                        onGenreChange={handleGenreChange}
                        selectedDate={selectedDate}
                        onDateChange={setSelectedDate}
                    />
                </aside>
                <section className={styles.searchResults}>
                    <SearchText text={searchText || selectedGeneros.join(', ') || selectedDate || "Todos"}/>

                    <div className={styles.resultGrid}>
                        {loading && <p>Buscando...</p>}
                        {error && <p>{error}</p>}

                        {!loading && !error && results.length === 0 && (
                            <p>Nenhum resultado encontrado.</p>
                        )}
            
                        {results.map(filme => (
                            <MovieBanner 
                                key={filme.id}
                                filmeId={filme.id} 
                                imageLink={filme.url_poster}
                            />
                        ))}
                    </div>
                </section>
            </main>

            <Footer variant="max"/>
        </div>
    )
};

export default Search;