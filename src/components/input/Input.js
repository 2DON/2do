import PropTypes from 'prop-types'
import React from 'react'
import './Input.scss'

function Input({
  id,
  placeholder,
  type,
  required,
  pattern,
  invalid,
  message,
  onChange,
  min,
  max,
}) {
  return (
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
  )
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'color',
    'date',
    'datetime-local',
    'email',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ]),
  required: PropTypes.bool,
  pattern: PropTypes.string,
  invalid: PropTypes.bool,
  message: PropTypes.string,
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
}

Input.defaultProps = {
  type: 'text',
  required: false,
  pattern: undefined,
  invalid: false,
  message: '',
  onChange: undefined,
  min: undefined,
  max: undefined,
}

export default Input
