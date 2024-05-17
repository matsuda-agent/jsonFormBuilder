import React , {useState} from 'react';
import { Controller } from 'react-hook-form';
import { InputFieldAttributes, FieldType } from './FieldAttributes'; // Adjust the import path as necessary
import {Input , Field , Label, Description} from '@headlessui/react'
import clsx from 'clsx'
import { PiX } from 'react-icons/pi';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
const PhoneField = ({ field :{id  , name, title , type, isMandatory , description},   formMethods : {register , control}  , index}) => {


  return (
    <Field>
      <Label className="text-sm/6 font-medium text-white">{title}</Label>
      <Description className="text-sm/6 text-white/50">{description}</Description>
        <Controller
          control={control}
          name={`array.${index}.phone`} // Adjust the name prop
          rules={{ required: isMandatory }}
          render={({ field: { onChange, onBlur, value, ref } })  => (
            <PhoneInput
              placeholder="Enter phone number"
              value={value}
              onChange={phoneNumber => onChange(phoneNumber)} 
              
              // className='mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            />
          )}
        />
    </Field>
  );
};

// InputField.propTypes = InputFieldAttributes; // Apply the predefined PropTypes

export default PhoneField;

