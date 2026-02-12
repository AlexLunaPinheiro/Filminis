import React from 'react'; // 1. Importe o React para os tipos
import Styles from './Chips.module.css';
import CastIcon from '../../assets/icons/X.png';

type CustomChipsProps = {
  variant?: 'cast' | 'approved' | 'disapproved' | 'waiting';
  text: string;
};

type ChipsProps = CustomChipsProps & React.HTMLAttributes<HTMLDivElement>;

function Chips({ variant, text, ...rest }: ChipsProps) {
  return (
    <div 
      className={`${Styles.chips} ${variant ? Styles[variant] : ''}`}
      {...rest} 
    >
      <p>{text}</p>
      {variant === 'cast' && (
        <img src={CastIcon} alt="Ícone de cast" className={Styles.icon} />
      )}
    </div>
  );
}

export default Chips;