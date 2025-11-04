import React from 'react';
import './Button.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button ({ children, ...props }: ButtonProps){
  return (
    <button className="submit-button" {...props}>
      {children}
    </button>
  );
};

export default Button;