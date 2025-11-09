import CategoryFilterOption from "../CategoryFilterOption";
import './CategoryFilterContainer.module.css'

function CategoryFilterContainer (){
    return(
        <article>
            <CategoryFilterOption text="Comédia" id="1"/>
            <CategoryFilterOption text="Terror" id="2"/>
            <CategoryFilterOption text="Ficção Científca" id="3"/>
            <CategoryFilterOption text="Drama" id="4"/>
            <CategoryFilterOption text="Suspense" id="5"/>
            <CategoryFilterOption text="Ação" id="6"/>
            <CategoryFilterOption text="Infantil" id="7"/>
        </article>
    )
}

export default CategoryFilterContainer;