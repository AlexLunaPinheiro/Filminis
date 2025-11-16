import { useState } from 'react';
import styles from './FormRegistrationContainer.module.css';
import GenericInput from '../GenericInput';
import DropDownSelect from '../DropDownSelect';
import SeparatedInput from '../SeparatedInput';
import Chips from '../Chips';
import ButtonGeneric from '../ButtonGeneric';

// --- Tipos e Mockups do Backend ---
type Person = { id: number; name: string; };
const mockActorDB: Person[] = [
    { id: 1, name: 'Nicolas Cage' }, { id: 2, name: 'Chris Pratt' }, { id: 3, name: 'Brad Pitt' },
];
const mockDirectorDB: Person[] = [
    { id: 101, name: 'Quentin Tarantino' },
];
const checkPersonInDB = async (name: string, db: Person[]): Promise<Person | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const found = db.find(person => person.name.toLowerCase() === name.toLowerCase());
    return found || null;
};

// --- 1. DEFINA AS NOVAS PROPS ---
type FormRegistrationContainerProps = {
    onPosterUrlChange: (url: string) => void;
    onCapaUrlChange: (url: string) => void;
}

// 2. RECEBA AS PROPS
function FormRegistrationContainer({ onPosterUrlChange, onCapaUrlChange }: FormRegistrationContainerProps) {
    
    // Estados do Formulário Principal
    const options = ['Angola', 'Brazil', 'Canadá', 'Dinamarca', 'Estados Unidos', 'Finlândia', 'Guiné'];
    const [nationality, setNationality] = useState<string | null>(null);

    // Estados para Atores
    const [currentActorName, setCurrentActorName] = useState('');
    const [addedActors, setAddedActors] = useState<Person[]>([]);
    const [showNewActorForm, setShowNewActorForm] = useState(false);
    const [newActorName, setNewActorName] = useState('');
    const [newActorLastName, setNewActorLastName] = useState('');
    const [newActorGender, setNewActorGender] = useState<string | null>(null);
    const [newActorPhotoUrl, setNewActorPhotoUrl] = useState('');

    // Estados para Diretores
    const [currentDirectorName, setCurrentDirectorName] = useState('');
    const [addedDirectors, setAddedDirectors] = useState<Person[]>([]);
    const [showNewDirectorForm, setShowNewDirectorForm] = useState(false);
    const [newDirectorName, setNewDirectorName] = useState('');
    const [newDirectorLastName, setNewDirectorLastName] = useState('');
    const [newDirectorGender, setNewDirectorGender] = useState<string | null>(null);
    const [newDirectorPhotoUrl, setNewDirectorPhotoUrl] = useState('');
    
    // --- 3. ESTADOS INTERNOS PARA OS INPUTS (Componentes Controlados) ---
    const [titulo, setTitulo] = useState('');
    const [orcamento, setOrcamento] = useState('');
    const [tempoDuracao, setTempoDuracao] = useState('');
    const [anoLancamento, setAnoLancamento] = useState('');
    const [posterUrl, setPosterUrl] = useState('');
    const [capaUrl, setCapaUrl] = useState('');
    const [sinopse, setSinopse] = useState('');

    // ... (Suas funções handleCheckActor, handleCheckDirector, removeChip) ...
    const handleCheckActor = async (e: React.KeyboardEvent) => {
        if (e.key !== 'Enter' || !currentActorName) return;
        e.preventDefault();
        const person = await checkPersonInDB(currentActorName, mockActorDB);
        if (person) {
            setAddedActors((current) => [...current, person]);
            setCurrentActorName('');
            setShowNewActorForm(false);
        } else {
            setShowNewActorForm(true);
            setNewActorName(currentActorName);
            setNewActorLastName('');
            setNewActorGender(null);
            setNewActorPhotoUrl('');
        }
    };
    const handleCheckDirector = async (e: React.KeyboardEvent) => {
        if (e.key !== 'Enter' || !currentDirectorName) return;
        e.preventDefault();
        const person = await checkPersonInDB(currentDirectorName, mockDirectorDB);
        if (person) {
            setAddedDirectors((current) => [...current, person]);
            setCurrentDirectorName('');
            setShowNewDirectorForm(false); 
        } else {
            setShowNewDirectorForm(true); 
            setNewDirectorName(currentDirectorName);
            setNewDirectorLastName('');
            setNewDirectorGender(null);
            setNewDirectorPhotoUrl('');
        }
    };
    const removeChip = (id: number, type: 'ator' | 'diretor') => {
        if (type === 'ator') {
            setAddedActors(addedActors.filter(p => p.id !== id));
        } else {
            setAddedDirectors(addedDirectors.filter(p => p.id !== id));
        }
    };

    // --- 4. CRIE HANDLERS PARA ATUALIZAR O PAI ---
    const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value;
        setPosterUrl(newUrl);       // Atualiza o estado interno
        onPosterUrlChange(newUrl);  // "Avisa" o pai (SolicitationForm)
    };

    const handleCapaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value;
        setCapaUrl(newUrl);         // Atualiza o estado interno
        onCapaUrlChange(newUrl);    // "Avisa" o pai (SolicitationForm)
    };

    return (
        <div className={styles.formRegistrationContainer}>
            <h1>Informações:</h1>

            <div className={styles.inputsContainer}>

                {/* --- 5. CONECTE OS INPUTS --- */}
                
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
                    variant='mid' type='text'
                    value={orcamento}
                    onChange={(e) => setOrcamento(e.target.value)}
                />
                <GenericInput 
                    label='Tempo de duração: ' 
                    placeholder='Digite o tempo de duração do filme' 
                    variant='mid' type='text'
                    value={tempoDuracao}
                    onChange={(e) => setTempoDuracao(e.target.value)}
                />
                <GenericInput 
                    label='Ano de lançamento:' 
                    placeholder='Digite o ano de lançamento:' 
                    variant='mid' type='text'
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
                    {/* (Lembre-se de transformar SeparatedInput em um componente controlado também) */}
                    <SeparatedInput label="Sinopse:" placeholder='Digite a sinopse do filme' variant='solicitationText'/>
                </div>
                
                <DropDownSelect label="Nacionalidade" value={nationality} options={options} onChange={setNationality}/>
                <DropDownSelect label="Gênero" value={nationality} options={options} onChange={setNationality}/>

                {/* --- Seção de Atores --- */}
                <GenericInput 
                    label='Atores:' 
                    placeholder='Digite o nome do ator e pressione Enter' 
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
                {showNewActorForm && (
                    <>
                        <GenericInput label='Nome (Ator):' placeholder='Digite o nome' variant='mid' type='text' value={newActorName} onChange={(e) => setNewActorName(e.target.value)} />
                        <GenericInput label='Sobrenome (Ator):' placeholder='Digite o sobrenome' variant='mid' type='text' value={newActorLastName} onChange={(e) => setNewActorLastName(e.target.value)} />
                        <DropDownSelect label="Gênero (Ator)" value={newActorGender} options={['Masculino', 'Feminino', 'Outro']} onChange={setNewActorGender} />
                        <GenericInput label='URL da foto (Ator):' placeholder='Digite a url da foto' variant='mid' type='text' value={newActorPhotoUrl} onChange={(e) => setNewActorPhotoUrl(e.target.value)} />
                    </>
                )}

                {/* --- Seção de Diretores --- */}
                <GenericInput 
                    label='Diretor:' 
                    placeholder='Digite o nome do diretor e pressione Enter' 
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
                {showNewDirectorForm && (
                    <>
                        <GenericInput label='Nome (Diretor):' placeholder='Digite o nome' variant='mid' type='text' value={newDirectorName} onChange={(e) => setNewDirectorName(e.target.value)} />
                        <GenericInput label='Sobrenome (Diretor):' placeholder='Digite o sobrenome' variant='mid' type='text' value={newDirectorLastName} onChange={(e) => setNewDirectorLastName(e.target.value)} />
                        <DropDownSelect label="Gênero (Diretor)" value={newDirectorGender} options={['Masculino', 'Feminino', 'Outro']} onChange={setNewDirectorGender} />
                        <GenericInput label='URL da foto (Diretor):' placeholder='Digite a url da foto' variant='mid' type='text' value={newDirectorPhotoUrl} onChange={(e) => setNewDirectorPhotoUrl(e.target.value)} />
                    </>
                )}
                
            </div>
            
            <div className={styles.submitButtonContainer}>
                <ButtonGeneric variant='max'>ENVIAR SOLICITAÇÃO DE CRIAÇÃO DO FILME</ButtonGeneric>
            </div>
        </div>
    )
}

export default FormRegistrationContainer;