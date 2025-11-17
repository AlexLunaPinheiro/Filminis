import { useState, useEffect } from 'react';
import styles from './FormRegistrationContainer.module.css';
import GenericInput from '../GenericInput';
import DropDownSelect from '../DropDownSelect';
import SeparatedInput from '../SeparatedInput';
import Chips from '../Chips';
import ButtonGeneric from '../ButtonGeneric';
import { useNavigate } from 'react-router-dom';

// 1. Imports dos interceptors
import { getAtores, getDiretores, getGeneros, getNacionalidades } from '../../services/interceptors/catalogo_interceptor';
import { createSolicitacao } from '../../services/interceptors/solicitacao_interceptor';
import type { CatalogoItem } from '../../services/interceptors/catalogo_interceptor';

type Person = { id: number; name: string; };

// 2. Props para receber filme para edição (da página Movies.tsx)
type FormRegistrationContainerProps = {
  onPosterUrlChange: (url: string) => void;
  onCapaUrlChange: (url: string) => void;
  filmeParaEditar?: any; // (Vem do navigate state)
}

function FormRegistrationContainer({ onPosterUrlChange, onCapaUrlChange, filmeParaEditar }: FormRegistrationContainerProps) {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 3. Estados para os dados do Catálogo (vindos do backend)
  const [generosDB, setGenerosDB] = useState<CatalogoItem[]>([]);
  const [nacionalidadesDB, setNacionalidadesDB] = useState<CatalogoItem[]>([]);
  const [atoresDB, setAtoresDB] = useState<CatalogoItem[]>([]);
  const [diretoresDB, setDiretoresDB] = useState<CatalogoItem[]>([]);

  // 4. Estados do Formulário (Controlados)
  const [titulo, setTitulo] = useState('');
  const [orcamento, setOrcamento] = useState('');
  const [tempoDuracao, setTempoDuracao] = useState(''); // "HH:MM:SS"
  const [anoLancamento, setAnoLancamento] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [capaUrl, setCapaUrl] = useState('');
  const [sinopse, setSinopse] = useState('');
  
  // 5. Estados para os Dropdowns (selecionados)
  const [selectedGeneros, setSelectedGeneros] = useState<Person[]>([]);
  const [selectedNacionalidade, setSelectedNacionalidade] = useState<Person | null>(null);

  // 6. Estados para Atores (Chips)
  const [currentActorName, setCurrentActorName] = useState('');
  const [addedActors, setAddedActors] = useState<Person[]>([]);
  // (Lógica de 'showNewActorForm' removida por simplicidade. Vamos focar em adicionar IDs existentes)

  // 7. Estados para Diretores (Chips)
  const [currentDirectorName, setCurrentDirectorName] = useState('');
  const [addedDirectors, setAddedDirectors] = useState<Person[]>([]);
  // (Lógica de 'showNewDirectorForm' removida)

  // 8. Carregar dados dos catálogos (Gêneros, Atores, etc.)
  useEffect(() => {
    async function loadCatalogo() {
      try {
        setGenerosDB(await getGeneros());
        setNacionalidadesDB(await getNacionalidades());
        setAtoresDB(await getAtores());
        setDiretoresDB(await getDiretores());
      } catch (err) {
        console.error("Erro ao carregar catálogo:", err);
        setError("Não foi possível carregar os dados para o formulário.");
      }
    }
    loadCatalogo();
  }, []);
  
  // 9. Pré-preencher o formulário se for uma EDIÇÃO
  useEffect(() => {
      if (filmeParaEditar) {
          setTitulo(filmeParaEditar.titulo || '');
          setOrcamento(String(filmeParaEditar.orcamento) || '');
          setTempoDuracao(filmeParaEditar.tempo_duracao || '');
          setAnoLancamento(String(filmeParaEditar.ano_lancamento) || '');
          setPosterUrl(filmeParaEditar.url_poster || '');
          setCapaUrl(filmeParaEditar.url_capa || '');
          setSinopse(filmeParaEditar.sinopse || '');
          
          // (Lógica mais complexa seria necessária para pré-selecionar IDs)
          onPosterUrlChange(filmeParaEditar.url_poster || '');
          onCapaUrlChange(filmeParaEditar.url_capa || '');
      }
  }, [filmeParaEditar, onPosterUrlChange, onCapaUrlChange]);

  // 10. Funções de Chip (Atores/Diretores)
  const handleCheckActor = (e: React.KeyboardEvent) => {
      if (e.key !== 'Enter' || !currentActorName) return;
      e.preventDefault();
      
      const found = atoresDB.find(a => 
          `${a.nome} ${a.sobrenome}`.toLowerCase() === currentActorName.toLowerCase()
      );
      
      if (found && !addedActors.find(a => a.id === found.id)) {
          setAddedActors(current => [...current, { id: found.id, name: `${found.nome} ${found.sobrenome}` }]);
          setCurrentActorName('');
      } else {
          // (Poderia mostrar um erro "Ator não encontrado")
          console.warn("Ator não encontrado ou já adicionado");
      }
  };

  const handleCheckDirector = (e: React.KeyboardEvent) => {
      if (e.key !== 'Enter' || !currentDirectorName) return;
      e.preventDefault();
      
      const found = diretoresDB.find(d => 
          `${d.nome} ${d.sobrenome}`.toLowerCase() === currentDirectorName.toLowerCase()
      );
      
      if (found && !addedDirectors.find(d => d.id === found.id)) {
          setAddedDirectors(current => [...current, { id: found.id, name: `${found.nome} ${found.sobrenome}` }]);
          setCurrentDirectorName('');
      } else {
          console.warn("Diretor não encontrado ou já adicionado");
      }
  };
  
  const removeChip = (id: number, type: 'ator' | 'diretor' | 'genero') => {
      if (type === 'ator') {
          setAddedActors(addedActors.filter(p => p.id !== id));
      } else if (type === 'diretor') {
          setAddedDirectors(addedDirectors.filter(p => p.id !== id));
      } else if (type === 'genero') {
          setSelectedGeneros(selectedGeneros.filter(p => p.id !== id));
      }
  };
  
  // 11. Funções de Dropdown
  const handleGenreChange = (nome: string) => {
      const genero = generosDB.find(g => g.nome === nome);
      if (genero && !selectedGeneros.find(g => g.id === genero.id)) {
          setSelectedGeneros(current => [...current, {id: genero.id, name: genero.nome}]);
      }
  };
  
  const handleNacionalidadeChange = (nome: string) => {
      const nac = nacionalidadesDB.find(n => n.nome === nome);
      if (nac) {
          setSelectedNacionalidade({id: nac.id, name: nac.nome});
      }
  };

  // 12. Handlers para Imagem (Conectando ao componente Pai)
  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newUrl = e.target.value;
      setPosterUrl(newUrl);
      onPosterUrlChange(newUrl);
  };

  const handleCapaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newUrl = e.target.value;
      setCapaUrl(newUrl);
      onCapaUrlChange(newUrl);
  };

  // 13. Função de SUBMIT
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
        // 14. Montar o PAYLOAD para o backend
        const payload = {
            titulo,
            sinopse,
            orcamento: parseFloat(orcamento),
            tempo_duracao: tempoDuracao, // (Validar formato HH:MM:SS)
            ano_lancamento: parseInt(anoLancamento),
            url_poster: posterUrl,
            url_capa: capaUrl,
            
            // Enviar apenas os IDs
            generos_ids: selectedGeneros.map(g => g.id),
            atores_ids: addedActors.map(a => a.id),
            diretores_ids: addedDirectors.map(d => d.id),
            nacionalidade_id: selectedNacionalidade?.id, // (Backend não parece usar isso, mas enviamos)
            
            // Se for edição, enviar o ID do filme
            filme_id: filmeParaEditar ? filmeParaEditar.id : undefined,
        };
        
        // 15. Definir o TIPO
        const tipo = filmeParaEditar ? 'EDICAO' : 'ADICAO';
        
        // 16. Chamar o interceptor
        await createSolicitacao(tipo, payload);
        
        setSuccess(`Solicitação de ${tipo === 'ADICAO' ? 'adição' : 'edição'} enviada com sucesso!`);
        // (Opcional: limpar o formulário)
        
        // Redirecionar para a página de solicitações após 2s
        setTimeout(() => {
            navigate('/profile', { state: { activeView: 'solicitacoes' } });
        }, 2000);

    } catch (err: any) {
        setError(err.message || "Erro ao enviar solicitação.");
    } finally {
        setLoading(false);
    }
  };

  // 17. Preparar opções para os dropdowns
  const generoOptions = generosDB.map(g => g.nome);
  const nacionalidadeOptions = nacionalidadesDB.map(n => n.nome);

  return (
      <div className={styles.formRegistrationContainer}>
          <h1>{filmeParaEditar ? 'Formulário de Edição' : 'Informações:'}</h1>

          <div className={styles.inputsContainer}>

              <GenericInput 
                  label='Titulo:' 
                  placeholder='Digite o titulo do filme' 
                  variant='mid' type='text'
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
              />
              <GenericInput 
                  label='Orçamento:' 
                  placeholder='Digite o orçamento do filme' 
                  variant='mid' type='number'
                  value={orcamento}
                  onChange={(e) => setOrcamento(e.target.value)}
              />
              <GenericInput 
                  label='Tempo de duração: ' 
                  placeholder='Use o formato HH:MM:SS (ex: 02:30:00)' 
                  variant='mid' type='text'
                  value={tempoDuracao}
                  onChange={(e) => setTempoDuracao(e.target.value)}
              />
              <GenericInput 
                  label='Ano de lançamento:' 
                  placeholder='Digite o ano de lançamento (ex: 2024)' 
                  variant='mid' type='number'
                  value={anoLancamento}
                  onChange={(e) => setAnoLancamento(e.target.value)}
              />
              <GenericInput 
                  label='URL do poster:' 
                  placeholder='Digite a url do poster' 
                  variant='mid' type='text'
                  value={posterUrl}
                  onChange={handlePosterChange}
              />
              <GenericInput 
                  label='URL da capa:' 
                  placeholder='Digite a url da capa' 
                  variant='mid' type='text'
                  value={capaUrl}
                  onChange={handleCapaChange}
              />
              
              <div className={styles.sinopseContainer}>
                  <SeparatedInput 
                    label="Sinopse:" 
                    placeholder='Digite a sinopse do filme' 
                    variant='solicitationText'
                    value={sinopse}
                    onChange={(e) => setSinopse(e.target.value)}
                  />
              </div>
              
              <DropDownSelect 
                label="Nacionalidade" 
                value={selectedNacionalidade?.name || null} 
                options={nacionalidadeOptions} 
                onChange={handleNacionalidadeChange}
              />
              
              {/* Dropdown de Gênero (agora é multiselect via chips) */}
              <DropDownSelect 
                label="Gênero" 
                value={null} // O valor é mostrado nos chips
                options={generoOptions} 
                onChange={handleGenreChange}
              />
              <div className={styles.chipsContainer} style={{gridColumn: 'span 2'}}>
                  {selectedGeneros.map(genero => (
                      <Chips key={genero.id} text={genero.name} variant='cast' onClick={() => removeChip(genero.id, 'genero')} />
                  ))}
              </div>


              {/* --- Seção de Atores --- */}
              <GenericInput 
                  label='Atores:' 
                  placeholder='Digite o nome completo do ator e pressione Enter' 
                  variant='mid' 
                  type='text'
                  value={currentActorName}
                  onChange={(e) => setCurrentActorName(e.target.value)}
                  onKeyDown={handleCheckActor}
              />
              <div className={styles.chipsContainer}>
                  {addedActors.map(actor => (
                      <Chips key={actor.id} text={actor.name} variant='cast' onClick={() => removeChip(actor.id, 'ator')} />
                  ))}
              </div>
              {/* (Formulário de novo ator removido por simplicidade) */}

              {/* --- Seção de Diretores --- */}
              <GenericInput 
                  label='Diretor:' 
                  placeholder='Digite o nome completo do diretor e pressione Enter' 
                  variant='mid' 
                  type='text'
                  value={currentDirectorName}
                  onChange={(e) => setCurrentDirectorName(e.target.value)}
                  onKeyDown={handleCheckDirector}
              />
              <div className={styles.chipsContainer}>
                   {addedDirectors.map(director => (
                      <Chips key={director.id} text={director.name} variant='cast' onClick={() => removeChip(director.id, 'diretor')} />
                  ))}
              </div>
              {/* (Formulário de novo diretor removido) */}
              
          </div>
          
          <div className={styles.submitButtonContainer}>
              <ButtonGeneric 
                variant='max' 
                onClick={handleSubmit} 
                disabled={loading}
              >
                  {loading ? 'Enviando...' : (filmeParaEditar ? 'ENVIAR SOLICITAÇÃO DE EDIÇÃO' : 'ENVIAR SOLICITAÇÃO DE CRIAÇÃO')}
              </ButtonGeneric>
              {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
              {success && <p style={{ color: 'var(--cor-secundaria)', marginTop: '10px' }}>{success}</p>}
          </div>
      </div>
  )
}

export default FormRegistrationContainer;