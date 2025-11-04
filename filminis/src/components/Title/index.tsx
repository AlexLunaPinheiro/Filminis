import React from 'react';
import './Title.css';

interface TitleProps {
  children: React.ReactNode;
}

function Title ({ children }:TitleProps){
  return <h1 className="form-title">{children}</h1>;
};

export default Title;