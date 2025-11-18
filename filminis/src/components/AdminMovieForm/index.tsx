import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './AdminMovieForm.module.css';

import GenericInput from '../GenericInput';
import ButtonGeneric from '../ButtonGeneric';
import Title from '../Title';
import Chips from '../Chips'; 

import { getFilmeById } from '../../services/interceptors/movie_interceptor';
import { adminCreateFilme, adminUpdateFilme } from '../../services/interceptors/admin_interceptor';
import { getCatalogo } from '../../services/interceptors/catalogo_interceptor';
import type { CatalogoItem } from '../../services/interceptors/catalogo_interceptor';

type Genero = { id: number; nome: string };
type Pessoa = CatalogoItem; 

function AdminMovieForm() {
    const { id } = useParams<{ id: string }>(); 
    const navigate = useNavigate();
    const isEditing = Boolean(id); 

    // (Todos os seus 'useState' e 'useEffect' estão corretos)
    // ... (Estados do formulário)
    const [titulo, setTitulo] = useState('');
    const [orcamento, setOrcamento] = useState('');
    const [tempoDuracao, setTempoDuracao] = useState('');
    const [anoLancamento, setAnoLancamento] = useState('');
    const [urlPoster, setUrlPoster] = useState('');
    const [urlCapa, setUrlCapa] = useState('');
    const [sinopse, setSinopse] = useState('');
    
    // (Estados dos catálogos)
    const [nacionalidades, setNacionalidades] = useState<Genero[]>([]);
    const [generos, setGeneros] = useState<Genero[]>([]);
    const [atores, setAtores] = useState<Pessoa[]>([]);
    const [diretores, setDiretores] = useState<Pessoa[]>([]);

    // (Estados das tags selecionadas)
    const [selectedNacionalidadeId, setSelectedNacionalidadeId] = useState<string>('');
    const [selectedGeneros, setSelectedGeneros] = useState<Genero[]>([]);
    const [selectedAtores, setSelectedAtores] = useState<Pessoa[]>([]);
    const [selectedDiretores, setSelectedDiretores] = useState<Pessoa[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // (Seu useEffect de 'loadCatalogos' está correto)
    useEffect(() => {
        async function loadCatalogos() {
            try {
                const data = await getCatalogo(); 
                setNacionalidades(data.nacionalidades);
                setGeneros(data.generos);
                setAtores(data.atores); 
                setDiretores(data.diretores);
            } catch (err) {
                console.error("Erro ao carregar catálogos", err);
                setError("Falha ao carregar dados do formulário.");
            }
        }
        loadCatalogos();
    }, []);

    // (Seu useEffect de 'loadFilme' está correto)
     useEffect(() => {
        if (isEditing && id) {
            async function loadFilme() {
                try {
                    setLoading(true);
                    const filme = await getFilmeById(id);
                    
                    setTitulo(filme.titulo);
                    setOrcamento(String(filme.orcamento || ''));
                    setTempoDuracao(filme.tempo_duracao || '');
                    setAnoLancamento(String(filme.ano_lancamento));
                    setUrlPoster(filme.url_poster || '');
                    setUrlCapa(filme.url_capa || '');
                    setSinopse(filme.sinopse || '');
                    
                    setSelectedGeneros(filme.generos);
                    setSelectedAtores(filme.atores);
                    setSelectedDiretores(filme.diretores);

                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            }
            loadFilme();
        }
    }, [id, isEditing]);

    // (Suas funções 'handleAddTag', 'handleRemoveTag' e 'handleSubmit' estão corretas)
    // ... (Lógica para Adicionar/Remover Tags)
    const handleAddTag = (idString: string, type: 'genero' | 'ator' | 'diretor') => {
        const id = parseInt(idString);
        if (isNaN(id) || !id) return; 

        if (type === 'genero') {
            const item = generos.find(g => g.id === id);
            if (item && !selectedGeneros.some(g => g.id === id)) {
                setSelectedGeneros(prev => [...prev, item]);
            }
        }
        if (type === 'ator') {
            const item = atores.find(a => a.id === id);
            if (item && !selectedAtores.some(a => a.id === id)) {
                setSelectedAtores(prev => [...prev, item]);
            }
        }
        if (type === 'diretor') {
            const item = diretores.find(d => d.id === id);
            if (item && !selectedDiretores.some(d => d.id === id)) {
                setSelectedDiretores(prev => [...prev, item]);
            }
        }
    };

    const handleRemoveTag = (id: number, type: 'genero' | 'ator' | 'diretor') => {
        if (type === 'genero') {
            setSelectedGeneros(prev => prev.filter(g => g.id !== id));
        }
        if (type === 'ator') {
            setSelectedAtores(prev => prev.filter(a => a.id !== id));
        }
        if (type === 'diretor') {
            setSelectedDiretores(prev => prev.filter(d => d.id !== id));
        }
    };

    // (Handle Submit)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const payload = {
            titulo,
            orcamento: parseFloat(orcamento) || null, // Converte para número ou null
            tempo_duracao: tempoDuracao,
            ano_lancamento: parseInt(anoLancamento),
            url_poster: urlPoster,
            url_capa: urlCapa,
            sinopse,
            generos_ids: selectedGeneros.map(g => g.id),
            atores_ids: selectedAtores.map(a => a.id),
            diretores_ids: selectedDiretores.map(d => d.id),
            nacionalidade_id: parseInt(selectedNacionalidadeId) || null,
        };

        try {
            if (isEditing && id) {
                await adminUpdateFilme(id, payload);
                alert("Filme atualizado com sucesso!");
                navigate(`/movies/${id}`); 
            } else {
                await adminCreateFilme(payload);
                alert("Filme criado com sucesso!");
                navigate('/admin'); 
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    // (Render)
    if (loading && isEditing) return <p style={{color: 'white'}}>Carregando dados do filme...</p>
    if (error) return <p style={{color: 'red'}}>{error}</p>

    return (
        <form className={styles.adminFormContainer} onSubmit={handleSubmit}>
            
            <div className={styles.formHeader}>
                <Title>{isEditing ? "Formulário de edição de filme" : "Formulário de novo filme"}</Title>
            </div>

            <section className={styles.infoSection}>
                <h2>Informações:</h2>
                {/* --- CORREÇÃO DA ORDEM E VARIANTS --- */}
                <div className={styles.grid}>
                    <GenericInput label="Título" placeholder="Digite o título do filme" variant="full" value={titulo} onChange={e => setTitulo(e.target.value)} />
                    
                    {/* (Linha 1 do grid) */}
                    <GenericInput label="Tempo de duração" placeholder="Ex: 02:30:00" variant="mid" value={tempoDuracao} onChange={e => setTempoDuracao(e.target.value)} />
                    <GenericInput label="Orçamento" placeholder="Ex: 15000000" variant="mid" type="number" value={orcamento} onChange={e => setOrcamento(e.target.value)} />
                    
                    {/* (Linha 2 do grid) */}
                    <GenericInput label="URL do poster" placeholder="Digite a url do poster" variant="mid" value={urlPoster} onChange={e => setUrlPoster(e.target.value)} />
                    <GenericInput label="Ano de lançamento" placeholder="Ex: 2010" variant="mid" type="number" value={anoLancamento} onChange={e => setAnoLancamento(e.target.value)} />

                    {/* (Linha 3 do grid - Nacionalidade na esquerda, Capa na direita) */}
                    <div className={styles.selectContainer}>
                        <label>Nacionalidade</label>
                        <select value={selectedNacionalidadeId} onChange={e => setSelectedNacionalidadeId(e.target.value)}>
                            <option value="">Selecione...</option>
                            {nacionalidades.map(n => (
                                <option key={n.id} value={n.id}>{n.nome}</option>
                            ))}
                        </select>
                    </div>
                    <GenericInput label="URL da capa" placeholder="Digite a url da capa" variant="mid" value={urlCapa} onChange={e => setUrlCapa(e.target.value)} />

                    {/* (Linha 4 do grid) */}
                    <GenericInput label="Sinopse" placeholder="Digite a sinopse do filme" variant="textBox" type="textarea" value={sinopse} onChange={e => setSinopse(e.target.value)} />
                </div>
            </section>
            
            <section className={styles.catalogoSection}>
                <h2>Catálogo:</h2>
                {/* (Seu código de catálogo estava correto) */}
                <div className={styles.selectGroup}>
                    <label>Adicionar Gênero</label>
                    <select onChange={e => handleAddTag(e.target.value, 'genero')}>
                        <option value="">Selecione...</option>
                        {generos.map(g => ( <option key={g.id} value={g.id}>{g.nome}</option> ))}
                    </select>
                    <div className={styles.tagsContainer}>
                        {selectedGeneros.map(g => (
                            <Chips key={g.id} text={g.nome} variant="cast" onClick={() => handleRemoveTag(g.id, 'genero')} />
                        ))}
                    </div>
                </div>

                <div className={styles.selectGroup}>
                    <label>Adicionar Ator</label>
                    <select onChange={e => handleAddTag(e.target.value, 'ator')}>
                        <option value="">Selecione...</option>
                        {atores.map(a => ( <option key={a.id} value={a.id}>{a.nome} {a.sobrenome}</option>))}
                    </select>
                    <div className={styles.tagsContainer}>
                        {selectedAtores.map(a => (
                            <Chips key={a.id} text={`${a.nome} ${a.sobrenome || ''}`} variant="cast" onClick={() => handleRemoveTag(a.id, 'ator')} />
                        ))}
                    </div>
                </div>
                
                <div className={styles.selectGroup}>
                    <label>Adicionar Diretor</label>
                    <select onChange={e => handleAddTag(e.target.value, 'diretor')}>
                        <option value="">Selecione...</option>
                        {diretores.map(d => ( <option key={d.id} value={d.id}>{d.nome} {d.sobrenome}</option>))}
                    </select>
                    <div className={styles.tagsContainer}>
                        {selectedDiretores.map(d => (
                            <Chips key={d.id} text={`${d.nome} ${d.sobrenome || ''}`} variant="cast" onClick={() => handleRemoveTag(d.id, 'diretor')} />
                        ))}
                    </div>
                </div>

            </section>

            <div className={styles.submitButtonContainer}>
                <ButtonGeneric variant='login' disabled={loading}>
                    {loading ? "Salvando..." : (isEditing ? "EDITAR FILME" : "ADICIONAR FILME")}
                </ButtonGeneric>
            </div>
        </form>
    );
}

export default AdminMovieForm;