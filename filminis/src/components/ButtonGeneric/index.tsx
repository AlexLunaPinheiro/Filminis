import React from 'react';
import './Button.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:'max'|'min'|'login';
};


  function ButtonGeneric ({ children,variant = 'max' ,...props }: ButtonProps){
    const className = `submit-button ${variant} ${props.className || ''}`;

  return (
    <button className={className.trim()} {...props}>
      {children}
    </button>
  );
};

export default ButtonGeneric;