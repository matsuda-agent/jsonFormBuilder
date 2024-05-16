import React from 'react';
import { useFormContext } from 'react-hook-form';
import { SelectFieldAttributes } from './FieldAttributes'; // Adjust the path as necessary

const SelectField = ({ id, title, description, options, isMandatory }) => {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor={id}>{title}</label>
      <select {...register(id, { required: isMandatory })} id={id}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <small>{description}</small>
    </div>
  );
};

SelectField.propTypes = SelectFieldAttributes; // Apply the predefined PropTypes

export default SelectField;


