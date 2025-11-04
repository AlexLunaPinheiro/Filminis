import React from 'react';
import './Button.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className="submit-button" {...props}>
      {children}
    </button>
  );
};

export default Button;