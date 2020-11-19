import React from 'react';
import './Textarea.scss';

const Textarea: React.FC<TextareaProps> = ({
  id,
  placeholder,
  required = false,
  invalid = false,
  message,
  onChange,
  min,
  max,
}) => (
  <div className={`Textarea ${invalid ? 'invalid' : ''}`}>
    <div>
      <textarea
        name={id}
        id={id}
        required={required}
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

interface TextareaProps {
  id: string;
  placeholder: string;
  required?: boolean;
  invalid?: boolean;
  message?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  min?: number;
  max?: number;
}

export default Textarea;
