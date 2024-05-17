import React , {useState} from 'react';
import { Controller } from 'react-hook-form';
import { InputFieldAttributes, FieldType } from './FieldAttributes'; // Adjust the import path as necessary
import {Input , Field , Label, Description} from '@headlessui/react'
import clsx from 'clsx'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const PhoneField = ({ field :{id  , name, title , type, isMandatory , description},   formMethods : {register , control} }) => {


  return (
    <Field>
      <Label className="text-sm/6 font-medium text-white">{title}</Label>
      <Description className="text-sm/6 text-white/50">{description}</Description>
      {/* <Input className={clsx(
              'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            {...register(name, { required: isMandatory })} type={type} id={id} /> */}
            <Controller
          control={control}
          name={`array.${index}.phone`} // Adjust the name prop
          rules={{ required: field.isMandatory }}
          render={({ field: { onChange, onBlur, value, ref } })  => (
            <PhoneInput
              placeholder="Enter phone number"
              value={value}
              onChange={phoneNumber => onChange(phoneNumber)} 
              className='mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            />
          )}
        />
    </Field>
  );
};

// InputField.propTypes = InputFieldAttributes; // Apply the predefined PropTypes

export default PhoneField;

