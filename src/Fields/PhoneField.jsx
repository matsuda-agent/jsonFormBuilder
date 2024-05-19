import React , {useState} from 'react';
import { Controller } from 'react-hook-form';
import { InputFieldAttributes, FieldType } from './FieldAttributes'; // Adjust the import path as necessary
import {Input , Field , Label, Description} from '@headlessui/react'
import clsx from 'clsx'
import { PiX } from 'react-icons/pi';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

import { useFormContext } from 'react-hook-form';

const PhoneField = ({ name  , AttributesKey:{fieldArrayName , key}  , AttributeSchema }) => {
  const { register, control, setValue, watch } = useFormContext();
  const { title, description, type, isMandatory } = AttributeSchema[`${fieldArrayName}.${key}`];

  return (
    <Field className="my-3">
      <Label className="text-sm/6 font-medium text-white">{title}</Label>
      <Description className="text-sm/6 text-white/50">{description}</Description>
        <Controller
          control={control}
          name={name} // Adjust the name prop
          rules={{ required: isMandatory }}
          render={({ field: { onChange, onBlur, value, ref } })  => (
            <PhoneInput
              placeholder="Enter phone number"
              value={value}
              onChange={phoneNumber => onChange(phoneNumber)} 
              inputStyle={
                {
                  width: '100%',
                  padding: '0.375rem 0.75rem',
                  fontSize: '1rem',
                  fontWeight: '400',
                  lineHeight: '1.5',
                  color: '#495057',
                  backgroundColor: 'white',
                  backgroundClip: 'padding-box',
                  border: '1px solid #ced4da',
                  transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                  '&:focus': {
                    color: '#495057',
                    backgroundColor: '#fff',
                    borderColor: '#80bdff',
                    outline: 0,
                    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
                  },
                }
              }

              // className='mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            />
          )}
        />
    </Field>
  );
};

// InputField.propTypes = InputFieldAttributes; // Apply the predefined PropTypes

export default PhoneField;

