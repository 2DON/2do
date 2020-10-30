import React from 'react';
import './Input.scss';

const Input: React.FC<InputProps> = ({
  id,
  placeholder,
  type = 'text',
  required = false,
  pattern,
  invalid = false,
  message,
  onChange,
  min,
  max,
}) => (
  <div className={`Input ${invalid ? 'invalid' : ''}`}>
    <div>
      <input
        type={type}
        name={id}
        id={id}
        required={required}
        pattern={pattern}
        minLength={min}
        maxLength={max}
        placeholder=" "
        onChange={onChange}
      />
      <label htmlFor={id}>{placeholder}</label>
      <span>{message}</span>
    </div>
  </div>
);

interface InputProps {
  id: string;
  placeholder: string;
  type?: 'date' | 'datetime-local' | 'email' | 'password' | 'text' | 'url';
  required?: boolean;
  pattern?: string;
  invalid?: boolean;
  message?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
}

export default Input;
