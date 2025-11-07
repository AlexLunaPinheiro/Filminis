import { useState } from 'react'
import Styles from './CategoryFilterOption.module.css'

type CategoryFilterOptionProps = {
  text: string,
  id: string
}

function CategoryFilterOption({ text, id }: CategoryFilterOptionProps) {
  const [checked, setChecked] = useState(false)

  return (
    <div
      className={`${Styles.CategoryFilterOptionContainer} ${
        checked ? Styles.checked : ''
      }`}
    >
      
      <label htmlFor={id}>{text}</label>
      
      <input type="checkbox" id={id} name="categoria" checked={checked}
        onChange={() => setChecked(!checked)}
        className={Styles.checkbox}
      />
    </div>
  )
}

export default CategoryFilterOption
