import React , {useState} from 'react';
import { useFormContext , Controller } from 'react-hook-form';
import {Checkbox , Field , Label, Description} from '@headlessui/react'
import { FaCheck } from "react-icons/fa";
import clsx from 'clsx'

const CheckboxField = ({ name  , AttributesKey:{fieldArrayName , key}  , AttributeSchema }) => {

 
  const { title, description, type, isMandatory , validations } = AttributeSchema[`${fieldArrayName}.${key}`];
  const { register, control, setValue, watch , formState: {errors} } = useFormContext();



  return (
    <div className="flex items-center justify-between p-4 space-x-3 my-3">
      <span className="text-sm/6 font-medium text-white">{description}</span>

      <Controller
          control={control}
          name={fieldName} // Adjust the name prop
          rules={{ required: isMandatory }}
          render={({ field: { onChange, onBlur, value, ref } })  => (
          <Checkbox 
            className="group size-6 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
            onChange={onChange}
            value={value}
            >
            
            <FaCheck className="hidden size-4 fill-black group-data-[checked]:block" />
          </Checkbox>
          )} />
    </div>
  );
};


export default CheckboxField;



