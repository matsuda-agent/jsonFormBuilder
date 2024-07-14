import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Description, Field, Label, Select } from '@headlessui/react'
import { FaChevronDown } from "react-icons/fa";
import clsx from 'clsx'




const SelectField = ({ name  , AttributesKey:{fieldArrayName , key}  , AttributeSchema }) => {
  const { register, control, setValue, watch } = useFormContext();
  const { title, description, type, isMandatory , options } = AttributeSchema[`${fieldArrayName}.${key}`];

  return (
    <Field>
      <Label className="select-input-label">{title}</Label>
        <Select
              placeholder={title}
              {...register(name, { required: isMandatory })}
              className="select-input" 
            >
          <option value="" disabled className='disabled-option:text-gray-100'>
                {title} 
          </option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}

          <FaChevronDown  />
        </Select>
    </Field>
  );
};

// SelectField.propTypes = SelectFieldAttributes; // Apply the predefined PropTypes

export default SelectField;


