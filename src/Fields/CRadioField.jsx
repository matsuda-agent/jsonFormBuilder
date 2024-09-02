
import React, { useEffect } from 'react';
import { useFormContext , Controller } from 'react-hook-form';
import { FaChevronDown } from "react-icons/fa";
import clsx from 'clsx'
import { ErrorMessage } from "@hookform/error-message"
import get from 'lodash-es/get';

import { useDependantField } from '../lib/DependantFieldProvider';

import {
    RadioCardGroup,
    RadioCardIndicator,
    RadioCardItem,
  } from "../UI/RadioCardGroup"
  

const CRadioField = ({ name  , Attributes:{title, description, type , is_required , options }  , validations  }) => {
  const { register, control, setValue, watch , formState: {errors}   } = useFormContext();
  const { setDependantField } = useDependantField();
  


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
        render={({ field : {value , onChange , onBlur } }) => (
        <RadioCardGroup  defaultValue={value} onValueChange={(value) => { onChange(value); setDependantField(name , value)}} className="grid-cols-2 text-sm">
            {options && options.map((option , index) => (   
                <RadioCardItem key={index} value={option.value}>
                    <div className="flex items-center gap-3">
                        <RadioCardIndicator />
                        <span>{option.label}</span>
                    </div>
                </RadioCardItem>
            ))}
        </RadioCardGroup>
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

export default CRadioField;


