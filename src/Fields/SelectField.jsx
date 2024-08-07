import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Description, Field, Label, Select } from '@headlessui/react'
import { FaChevronDown } from "react-icons/fa";
import clsx from 'clsx'
import { ErrorMessage } from "@hookform/error-message"
import {get , isBoolean} from 'lodash'



const SelectField = ({ name  , AttributesKey:{fieldArrayName , key}  , AttributeSchema }) => {
  const { register, control, setValue, watch , formState: {errors}  } = useFormContext();
  const { title, description, type, isMandatory , options } = AttributeSchema[`${fieldArrayName}.${key}`];
  


  // get the errors 
  const error = get(errors, name)

  return (
    <Field>
      <Label className={`${error ? 'select-input-label-error' : 'select-input-label'}`}>
        {title}
      </Label>
        <Select
              placeholder={title}
              {...register(name, { required: isMandatory })}
              className={`${error ? 'select-input-error' : 'select-input'}`} 
            >
          <option value="" disabled className='select-input-option'>
                {title} 
          </option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}

          <FaChevronDown  />
        </Select>


    <ErrorMessage
        errors={errors}
        name={name}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => {
            return (
            <p className='text-red-400' key={type}>{message}</p>
          )
        })
        }
      />    

    </Field>
  );
};

// SelectField.propTypes = SelectFieldAttributes; // Apply the predefined PropTypes

export default SelectField;


