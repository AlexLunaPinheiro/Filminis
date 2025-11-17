// import { useState, useEffect } from 'react'; // <-- Removido
import CategoryFilterOption from "../CategoryFilterOption";
import styles from './CategoryFilterContainer.module.css'
import YearInput from "../YearInput";

const generosFiltro = [
    "Comédia",
    "Terror",
    "Ficção científica",
    "Drama",
    "Suspense",
    "Ação",
    "Infantil"
];

// 2. Props (o componente ainda recebe os valores selecionados do pai)
type CategoryFilterContainerProps = {
    selectedGeneros: string[];
    onGenreChange: (genero: string, isChecked: boolean) => void;
    selectedDate: string;
    onDateChange: (date: string) => void;
};

function CategoryFilterContainer ({ 
    selectedGeneros, 
    onGenreChange, 
    selectedDate, 
    onDateChange 
}: CategoryFilterContainerProps){
    
    // 3. Removido o useState e o useEffect de 'loadGeneros'

    return(
        <article className={styles.filterContainer}>
            {/* 4. Mapear sobre a lista "blocada" */}
            {generosFiltro.map(genero => (
                <CategoryFilterOption 
                    key={genero} // Usar o nome do gênero como chave
                    text={genero}
                    id={`gen-${genero}`}
                    // A lógica de controle (isChecked, onToggle) é a mesma
                    isChecked={selectedGeneros.includes(genero)}
                    onToggle={(isChecked) => onGenreChange(genero, isChecked)}
                />
            ))}
            
            <YearInput 
                initialValue={selectedDate}
                setSearchText={onDateChange} 
            />
        </article>
    )
}

export default CategoryFilterContainer;