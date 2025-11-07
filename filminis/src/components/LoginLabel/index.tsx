import React from 'react';
import './Label.css';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

function Label ({ htmlFor, children }: LabelProps){
  return (
    <label className="form-label" htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;