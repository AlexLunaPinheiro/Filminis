import Label from '../Label';
import Input from '../Input';
import './LoginFormField.css';

interface FormFieldProps {
  label: string;
  type: string;
  placeholder: string;
  name: string;
}

function FormField({ label, type, placeholder, name }: FormFieldProps) {
  return (
    <div className="form-field-wrapper">
      <Label htmlFor={name}>{label}</Label>
      <Input type={type} placeholder={placeholder} id={name} name={name} />
    </div>
  );
};

export default FormField;