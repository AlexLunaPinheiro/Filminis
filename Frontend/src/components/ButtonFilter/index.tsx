import { useState } from 'react'
import Styles from './ButtonFilter.module.css'

type ButtonFilterProps = {
  text: string
}

function ButtonFilter({ text }: ButtonFilterProps) {
  const [estado, setEstado] = useState(false)

  return (
    <button
      className={`${Styles.ButtonFilter} ${estado ? Styles.activated : ''}`}
      onClick={() => setEstado(!estado)} 
    >
      {text}
    </button>
  )
}

export default ButtonFilter
