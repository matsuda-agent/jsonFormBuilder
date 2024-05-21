import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Description, Field, Label, Select } from '@headlessui/react'
import { FaChevronDown } from "react-icons/fa";
import clsx from 'clsx'
import {useStyle} from '../StyleProvider.tsx';




const SelectField = ({ name  , AttributesKey:{fieldArrayName , key}  , AttributeSchema }) => {
  const { register, control, setValue, watch } = useFormContext();
  const { title, description, type, isMandatory , options } = AttributeSchema[`${fieldArrayName}.${key}`];
  const {styles} = useStyle();


  return (
    <Field>
      {/* <Label className={styles.selectField.label}>{title}</Label> */}
  
      <div className="relative">
        <Select
              className={styles.selectField.selectField}
              placeholder={title}
              {...register(name, { required: isMandatory })}
            >
          <option value="" disabled className='disabled-option:text-gray-100'>
                {title} 
          </option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
         
        </Select>
        <FaChevronDown  
          className={styles.selectField.icon}/>
       
      </div>
    </Field>
  );
};

// SelectField.propTypes = SelectFieldAttributes; // Apply the predefined PropTypes

export default SelectField;


