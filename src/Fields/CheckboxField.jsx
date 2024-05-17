import React , {useState} from 'react';
import { useFormContext , Controller } from 'react-hook-form';
import { InputFieldAttributes, FieldType } from './FieldAttributes'; // Adjust the import path as necessary
import {Checkbox , Field , Label, Description} from '@headlessui/react'
import { FaCheck } from "react-icons/fa";
import clsx from 'clsx'

const CheckboxField = ({ field :{id  , name, title , type, isMandatory , description},   formMethods : {register , control}  , index , fieldArrayName}) => {

  const [enabled, setEnabled] = useState(false)
  let fieldName;
  if(fieldArrayName){
    fieldName= `${fieldArrayName}.${index}.${name}`
  } else{
    fieldName = name
  }



  return (
    //  <Field className="w-full">
    
    //   <Description className="text-sm/6 text-white/50">{description}</Description>
    <div className="flex items-center justify-between p-4 space-x-3">
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
            // {...register(name, { required: isMandatory })} 
   
            >
            {/* Checkmark icon */}
            {/* <Label className="text-sm/6 font-medium text-white">{title}</Label> */}
            
            <FaCheck className="hidden size-4 fill-black group-data-[checked]:block" />
          </Checkbox>
          )} />
    </div>
  );
};

// InputField.propTypes = InputFieldAttributes; // Apply the predefined PropTypes

export default CheckboxField;




// InputField.propTypes = InputFieldAttributes; // Apply the predefined PropTypes


