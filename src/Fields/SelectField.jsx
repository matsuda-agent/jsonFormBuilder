import React from 'react';
import { useFormContext } from 'react-hook-form';
import { SelectFieldAttributes } from './FieldAttributes'; // Adjust the path as necessary
import { Description, Field, Label, Select } from '@headlessui/react'
import { FaChevronDown } from "react-icons/fa";
import clsx from 'clsx'



const SelectField = ({ field :{id  , name, title , type, isMandatory , description , options},   formMethods : {register} }) => {

  return (
    <Field>
      <Label className="text-sm/6 font-medium text-white">{title}</Label>
      <Description className="text-sm/6 text-white/50">{description}</Description>
      <div className="relative">

        <Select
              className={clsx(
                'mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
              )}
              {...register(name, { required: isMandatory })} id={id}
            >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FaChevronDown  
          className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60" />
      </div>
    </Field>
  );
};

// SelectField.propTypes = SelectFieldAttributes; // Apply the predefined PropTypes

export default SelectField;


