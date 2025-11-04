import React from 'react';
import Label from '../Label';
import Input from '../Input';
import './LoginFormField.css';

interface FormFieldProps {
  label: string;
  type: string;
  placeholder: string;
  name: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, type, placeholder, name }) => {
  return (
    <div className="form-field-wrapper">
      <Label htmlFor={name}>{label}</Label>
      <Input type={type} placeholder={placeholder} id={name} name={name} />
    </div>
  );
};

export default FormField;