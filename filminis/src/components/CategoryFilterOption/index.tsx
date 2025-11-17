import Styles from './CategoryFilterOption.module.css'
// import { useState } from 'react' // Remover estado local

type CategoryFilterOptionProps = {
  text: string,
  id: string,
  isChecked: boolean, // 1. Receber estado do pai
  onToggle: (isChecked: boolean) => void; // 2. Receber handler do pai
}

function CategoryFilterOption({ text, id, isChecked, onToggle }: CategoryFilterOptionProps) {
  // const [checked, setChecked] = useState(false) // 3. Remover estado local

  const handleChange = () => {
    onToggle(!isChecked); // 4. Informar o pai sobre a mudança
  };

  return (
    <div
      className={`${Styles.CategoryFilterOptionContainer} ${
        isChecked ? Styles.checked : '' // 5. Usar o estado do pai
      }`}
    >
      <label htmlFor={id}>{text}</label>
      
      <input type="checkbox" id={id} name="categoria" 
        checked={isChecked} // 5. Usar o estado do pai
        onChange={handleChange} // 6. Usar o novo handler
        className={Styles.checkbox}
      />
    </div>
  )
}

export default CategoryFilterOption