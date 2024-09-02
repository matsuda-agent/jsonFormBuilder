import React from 'react';
import { useFormContext , Controller } from 'react-hook-form';
import { FaChevronDown } from "react-icons/fa";
import clsx from 'clsx'
import { ErrorMessage } from "@hookform/error-message"
import get from 'lodash-es/get';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../UI/Select"




const SelectField = ({ name  , Attributes:{title, description, type , is_required , options}  , validations  }) => {
  const { register, control, setValue, watch , formState: {errors}  } = useFormContext();
  


  // get the errors 
  const error = get(errors, name)

  return (
    <div>
      <label className={`${error ? 'select-input-label-error' : 'select-input-label'}`}>
        {title}
      </label>
      <Controller 
        control={control}
        name={name}
        rules={{
          required: is_required ? 'This field is required' : false ,
          ...validations
        }}
        render={({ field : {value , onChange , onBlue } }) => (
          <Select defaultValue ={value} onValueChange={(v) => onChange(v)}>
            <SelectTrigger id="size" className="mt-2">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {options.map((item) => (
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


