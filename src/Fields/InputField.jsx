import React from 'react';
import { useFormContext } from 'react-hook-form';
import { InputFieldAttributes, FieldType } from './FieldAttributes'; // Adjust the import path as necessary
import {Input , Field , Label, Description} from '@headlessui/react'
import clsx from 'clsx'

const InputField = ({ field :{id  , name, title , type, isMandatory , description},   formMethods : {register} }) => {

  return (
    <Field className="my-3">
      <Label className="text-sm/6 font-medium text-white">{title}</Label>
      <Description className="text-sm/6 text-white/50">{description}</Description>
      <Input className={clsx(
              'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            {...register(name, { required: isMandatory })} type={type} id={id} />
      
    </Field>
  );
};

// InputField.propTypes = InputFieldAttributes; // Apply the predefined PropTypes

export default InputField;




// InputField.propTypes = InputFieldAttributes; // Apply the predefined PropTypes


