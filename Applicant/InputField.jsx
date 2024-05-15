import React from 'react';
import { useFormContext } from 'react-hook-form';
import { InputFieldAttributes, FieldType } from './FieldAttributes'; // Adjust the import path as necessary

const InputField = ({ id, title, description, type, isMandatory }) => {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor={id}>{title}</label>
      <input {...register(id, { required: isMandatory })} type={type} id={id} />
      <small>{description}</small>
    </div>
  );
};

InputField.propTypes = InputFieldAttributes; // Apply the predefined PropTypes

export default InputField;

