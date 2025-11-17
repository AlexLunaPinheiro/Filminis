import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Movies.module.css';
import CastCard from '../../components/CastCard';
import DirectorCard from '../../components/DirectorCard';
import MoviesSlider from '../../components/MoviesSlider';
import Topic from '../../components/Topic';
import Navbar from '../../components/NavBar';
import MovieSpecs from '../../components/MovieSpecs';
import Footer from '../../components/Footer';
import ActionButton from '../../components/ActionButton';
import { useAuth } from '../../context/auth_context'; 

import { getFilmeById } from '../../services/interceptors/movie_interceptor';
import type { FilmeDetalhado } from '../../services/interceptors/movie_interceptor';

// 1. IMPORTE O NOVO INTERCEPTOR
import { deleteFilmeById } from '../../services/interceptors/admin_interceptor';


function Movies(){
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { isLoggedIn, user } = useAuth(); 
    const isAdmin = user?.role === 'ADMIN';

    const [filme, setFilme] = useState<FilmeDetalhado | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadFilme() {
            if (!id) {
                setError("Nenhum ID de filme fornecido.");
                setLoading(false);
                return; 
            }
            
            try {
                setLoading(true);
                setError(null);
                const data = await getFilmeById(id); 
                setFilme(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadFilme();
    }, [id]);

    const goToAddMovie = () => {
        if (isAdmin) {
            navigate(`/admin/filmes/editar/${filme?.id}`);
        } else {
            navigate("/solicitation", { state: { filmeParaEditar: filme } });
        }
    };

    // 2. ATUALIZE A FUNÇÃO DE DELETAR
    const handleDeleteMovie = async () => {
        if (!filme || !isAdmin || !id) return;

        const confirmar = window.confirm(`Tem certeza que deseja excluir "${filme.titulo}"? Esta ação é irreversível.`);
        
        if (confirmar) {
            try {
                // Use a função do interceptor
                await deleteFilmeById(id); 
                alert("Filme excluído com sucesso!");
                navigate('/admin'); // Volta pro dashboard
            } catch (err: any) {
                alert(`Erro ao excluir filme: ${err.message}`);
            }
        }
    };

    const formatDuracao = (tempo: string) => {
        if (!tempo) return { horas: 0, minutos: 0 };
        const [horas, minutos] = tempo.split(':').map(Number);
        return { horas, minutos };
    };
    
    if (loading) {
        return (
            <div className={styles.moviesContainer}>
                <header className={styles.moviesHeader}>
                    <Navbar variant='transparent'></Navbar>
                </header>
                <main className={styles.movieMain}>
                    <p>Carregando filme...</p>
                </main>
                <Footer variant='max'/>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.moviesContainer}>
                <header className={styles.moviesHeader}>
                    <Navbar variant='transparent'></Navbar>
                </header>
                <main className={styles.movieMain}>
                    <p>Erro ao buscar filme: {error}</p>
                </main>
                <Footer variant='max'/>
            </div>
        );
    }
    
    if (!filme) {
        return (
            <div className={styles.moviesContainer}>
                 <header className={styles.moviesHeader}>
                    <Navbar variant='transparent'></Navbar>
                </header>
                <main className={styles.movieMain}>
                    <p>Filme não encontrado.</p>
                </main>
                <Footer variant='max'/>
            </div>
        );
    }

    const { horas, minutos } = formatDuracao(filme.tempo_duracao);
    const generos = filme.generos.map(g => g.nome);
    
    const produtoraString = filme.produtoras && filme.produtoras.length > 0
        ? filme.produtoras.map(p => p.nome).join(', ')
        : "Produtora não informada";
        
    return(
        <div className={styles.moviesContainer}>
            <header 
                className={styles.moviesHeader} 
                style={{ backgroundImage: `url(${filme.url_capa || filme.url_poster})` }}
            >
                <Navbar variant='transparent'></Navbar>
                
                <div className={styles.sombras}>
                    <div className={styles.movieInfo}>
                        <h1>{filme.titulo}</h1>
                        <MovieSpecs 
                            ano={filme.ano_lancamento} 
                            duracaoHoras={horas} 
                            duracaoMinutos={minutos} 
                            generos={generos} 
                            produtora={produtoraString}
                        />
                        
                        <div className={styles.actionButtonContainer}>
                            {isLoggedIn && !isAdmin && (
                                <ActionButton 
                                    text={'Sugerir edição +'} 
                                    variant='create'
                                    onClick={goToAddMovie}
                                />
                            )}

                            {isAdmin && (
                                <>
                                    <ActionButton 
                                        text={'Editar filme'} 
                                        variant='create'
                                        onClick={goToAddMovie}
                                    />
                                    <ActionButton 
                                        text={'Excluir filme'} 
                                        variant='delete'
                                        onClick={handleDeleteMovie}
                                    />
                                </>
                            )}
                        </div>
                        
                        <div className={styles.castContainer}>
                            <h2>Elenco:</h2>
                            <div className={styles.cast}>
                                {filme.diretores.map((d, index) => (
                                    <DirectorCard 
                                        key={`dir-${index}`}
                                        imageLink={d.url_foto || ''} 
                                        nome={`${d.nome} ${d.sobrenome}`}
                                    />
                                ))}
                                {filme.atores.map((a, index) => (
                                    <CastCard 
                                        key={`ator-${index}`}
                                        imageLink={a.url_foto || ''} 
                                        nome={`${a.nome} ${a.sobrenome}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className={styles.movieMain}>
                <section className={styles.sinopse}>
                    <Topic text='Sinopse:'/>
                    <p className={styles.sinopseText}>
                        {filme.sinopse || "Sinopse não disponível."}
                    </p>
                </section>
                <section className={styles.relatedMovies}>
                    <Topic text='Você também vai gostar:'/>
                    <MoviesSlider />
                </section>
            </main>

            <Footer variant='max'/>
        </div>
    )
};

export default Movies;