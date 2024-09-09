import React from 'react';
import { useFormContext , Controller } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../UI/Select"

import useDependantFieldStore from '../store/useDependantFieldStore'  ;
import { Label } from '@radix-ui/react-label';




interface SelectFieldFieldProps {
  name: string;
  Attributes: {
    type: string;
    title: string;
    description: string; // Make description optional
    is_required: boolean;
    options?: any; // Replace 'any' with the actual type if known
    dependant_on?: any; // Replace 'any' with the actual type if known
  };
  validations?: any; // Replace 'any' with the actual type if known
}



const SelectField:React.FC<SelectFieldFieldProps>  = ({ name  , Attributes:{title, is_required , options}  , validations  }) => {
  const {control, formState: {errors}  } = useFormContext();
  const setDependantField = useDependantFieldStore(state => state.setDependantField)
  




  const handleChange = (value:string) => {
    setDependantField(name , value)
  }

  return (
    <div className='col-span-2'>
      <Label className='text-sm'>
        {title}
      </Label>
      <Controller 
        control={control}
        name={name}
        rules={{
          required: is_required ? 'This field is required' : false ,
          ...validations
        }}
        render={({ field : {value , onChange  } }) => (
          <Select defaultValue ={value} onValueChange={(v) => {onChange(v); handleChange(v); }}>
            <SelectTrigger id="size" className="mt-2">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {options.map((item: {value : string , label: string} ) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
        </Select>
        )}
      />

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

    </div>
  );
};

// SelectField.propTypes = SelectFieldAttributes; // Apply the predefined PropTypes

export default SelectField;


