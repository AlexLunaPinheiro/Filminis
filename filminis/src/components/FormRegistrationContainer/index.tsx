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
    { id: 1, name: 'Nicolas Cage' },
    { id: 2, name: 'Chris Pratt' },
    { id: 3, name: 'Brad Pitt' },
];
const mockDirectorDB: Person[] = [
    { id: 101, name: 'Quentin Tarantino' },
];

// Simula a verificação no DB
const checkPersonInDB = async (name: string, db: Person[]): Promise<Person | null> => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simula delay
    const found = db.find(person => person.name.toLowerCase() === name.toLowerCase());
    return found || null;
};

// --- Componente ---

function FormRegistrationContainer() {
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

    /**
     * Chamado ao pressionar Enter no input de ATOR
     */
    const handleCheckActor = async (e: React.KeyboardEvent) => {
        if (e.key !== 'Enter' || !currentActorName) return;
        
        e.preventDefault(); // Impede o submit
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

    /**
     * Chamado ao pressionar Enter no input de DIRETOR
     */
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

    // Função para remover um chip
    const removeChip = (id: number, type: 'ator' | 'diretor') => {
        if (type === 'ator') {
            setAddedActors(addedActors.filter(p => p.id !== id));
        } else {
            setAddedDirectors(addedDirectors.filter(p => p.id !== id));
        }
    };

    return (
        <div className={styles.formRegistrationContainer}>
            <h1>Informações:</h1>

            <div className={styles.inputsContainer}>

                {/* --- Linha 1 --- */}
                <GenericInput label='Titulo:' placeholder='Digite o titulo do filme' variant='mid' type='text'/>
                <GenericInput label='Orçamento:' placeholder='Digite o orçamento do filme' variant='mid' type='text'/>
                
                {/* --- Linha 2 --- */}
                <GenericInput label='Tempo de duração: ' placeholder='Digite o tempo de duração do filme' variant='mid' type='text'/>
                <GenericInput label='Ano de lançamento:' placeholder='Digite o ano de lançamento:' variant='mid' type='text'/>
                
                {/* --- Linha 3 --- */}
                <GenericInput label='URL do poster:' placeholder='Digite a url do poster' variant='mid' type='text'/>
                <GenericInput label='URL da capa:' placeholder='Digite a url da capa' variant='mid' type='text'/>
                
                {/* --- Linha 4 (Sinopse) --- */}
                <div className={styles.sinopseContainer}>
                    <SeparatedInput label="Sinopse:" placeholder='Digite a sinopse do filme' variant='solicitationText'/>
                </div>

                {/* --- Linha 5 --- */}
                <DropDownSelect label="Nacionalidade" value={nationality} options={options} onChange={setNationality}/>
                <DropDownSelect label="Gênero" value={nationality} options={options} onChange={setNationality}/>

                {/* --- Linha 6 (Atores) --- */}
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

                {/* --- CORREÇÃO: SEÇÃO DINÂMICA (Novo Ator) --- */}
                {/* Esta seção agora está logo abaixo da seção de Atores */ }
                {showNewActorForm && (
                    <>
                        <GenericInput 
                            label='Nome (Ator):' 
                            placeholder='Digite o nome' 
                            variant='mid' 
                            type='text'
                            value={newActorName}
                            onChange={(e) => setNewActorName(e.target.value)}
                        />
                        <GenericInput 
                            label='Sobrenome (Ator):' 
                            placeholder='Digite o sobrenome' 
                            variant='mid' 
                            type='text'
                            value={newActorLastName}
                            onChange={(e) => setNewActorLastName(e.target.value)}
                        />
                        <DropDownSelect 
                            label="Gênero (Ator)" 
                            value={newActorGender} 
                            options={['Masculino', 'Feminino', 'Outro']}
                            onChange={setNewActorGender}
                        />
                        <GenericInput 
                            label='URL da foto (Ator):' 
                            placeholder='Digite a url da foto' 
                            variant='mid' 
                            type='text'
                            value={newActorPhotoUrl}
                            onChange={(e) => setNewActorPhotoUrl(e.target.value)}
                        />
                    </>
                )}

                {/* --- Linha 7 (Diretores) --- */}
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

                {/* --- CORREÇÃO: SEÇÃO DINÂMICA (Novo Diretor) --- */}
                {/* Esta seção agora está logo abaixo da seção de Diretores */ }
                {showNewDirectorForm && (
                    <>
                        <GenericInput 
                            label='Nome (Diretor):' 
                            placeholder='Digite o nome' 
                            variant='mid' 
                            type='text'
                            value={newDirectorName}
                            onChange={(e) => setNewDirectorName(e.target.value)}
                        />
                        <GenericInput 
                            label='Sobrenome (Diretor):' 
                            placeholder='Digite o sobrenome' 
                            variant='mid' 
                            type='text'
                            value={newDirectorLastName}
                            onChange={(e) => setNewDirectorLastName(e.target.value)}
                        />
                        <DropDownSelect 
                            label="Gênero (Diretor)" 
                            value={newDirectorGender} 
                            options={['Masculino', 'Feminino', 'Outro']}
                            onChange={setNewDirectorGender}
                        />
                        <GenericInput 
                            label='URL da foto (Diretor):' 
                            placeholder='Digite a url da foto' 
                            variant='mid' 
                            type='text'
                            value={newDirectorPhotoUrl}
                            onChange={(e) => setNewDirectorPhotoUrl(e.target.value)}
                        />
                    </>
                )}
                
            </div>
            
            {/* Botão de Envio Principal */}
            <div className={styles.submitButtonContainer}>
                <ButtonGeneric variant='max'>ENVIAR SOLICITAÇÃO DE CRIAÇÃO DO FILME</ButtonGeneric>
            </div>
        </div>
    )
}

export default FormRegistrationContainer;