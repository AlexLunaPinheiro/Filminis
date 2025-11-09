import Styles from './Chips.module.css';
import CastIcon from '../../assets/icons/X.png';

type ChipsProps = {
  variant?: 'cast' | 'approved' | 'disapproved' | 'waiting';
  text: string;
};

function Chips({ variant, text }: ChipsProps) {
  return (
    <div className={`${Styles.chips} ${Styles[variant || '']}`}>
      <p>{text}</p>
       {variant === 'cast' && (
        <img src={CastIcon} alt="Ícone de cast" className={Styles.icon} />
      )}
    </div>
  );
}

export default Chips;