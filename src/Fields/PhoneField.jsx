import React , {useState} from 'react';
import { Controller } from 'react-hook-form';
import {Input , Field , Label, Description} from '@headlessui/react'
import { PhoneInput } from 'react-international-phone';
// import 'react-international-phone/style.css';
import { useFormContext } from 'react-hook-form';

const PhoneField = ({ name  , AttributesKey:{fieldArrayName , key}  , AttributeSchema }) => {
  const { register, control, setValue, watch } = useFormContext();
  const { title, description, type, isMandatory } = AttributeSchema[`${fieldArrayName}.${key}`];


  return (
    <Field>
      <Label className="phone-input-label">{title}</Label>
      {/* <Description className="text-sm/6 text-white/50">{description}</Description> */}
        <Controller
          control={control}
          name={name} // Adjust the name prop
          rules={{ required: isMandatory }}
          render={({ field: { onChange, onBlur, value, ref } })  => (
            <PhoneInput
              placeholder={description}
              value={value}
              onChange={phoneNumber => onChange(phoneNumber)} 
              className='phone-input'

              // className='mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            />
          )}
        />
    </Field>
  );
};

// InputField.propTypes = InputFieldAttributes; // Apply the predefined PropTypes

export default PhoneField;

