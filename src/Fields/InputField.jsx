import React, { useEffect } from 'react';
import { useFormContext , Controller } from 'react-hook-form';
import { useState } from 'react';
import clsx from 'clsx'
import { ErrorMessage } from "@hookform/error-message"
import get from 'lodash-es/get';

import {Input } from '../UI/Input'

import { useDependantField } from '../lib/DependantFieldProvider';

const InputField = ({ name  , Attributes:{title, description, type , is_required , dependantOn}  , validations  }) => {

  const { register, control, setValue, watch , formState: {errors} } = useFormContext();

  // get the errors 
  const error = get(errors, name)

 
  // this is using the depandat field provider, it also matches the field, it also takes into account the arra 
  if (dependantOn) {
    const { dependantFields } = useDependantField();
    const parts = name.split('.');
    parts[parts.length - 1] = dependantOn.field_name;
    const watchfield = parts.join('.');
    if( dependantFields[watchfield]  !== dependantOn.field_value) {
      return null;
    }
  }





  return (
    <div>
      <label className={`${error ? 'basic-input-label-error' : 'basic-input-label'}`}>{title}</label>
      <Controller 
      control={control}
      name={name}
      rules={{
        required: is_required ? 'This field is required' : false ,
        ...validations
      }}
      render={({ field }) => (
        <Input
          {...field}
          placeholder={`Enter ${title}`}
          type={type}
          hasError={!!error}
        />
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

export default InputField;



{/* <Field>
<Label className={`${error ? 'basic-input-label-error' : 'basic-input-label'}`}>
 {title}
 </Label> 
 <Input  {...register(name , {required: 'This field is required'})} 
       type={type} placeholder={`Enter ${title}`}  
       className={`${error ? 'basic-input-error' : 'basic-input'}`} />


   

</Field> */}



// InputField.propTypes = InputFieldAttributes; // Apply the predefined PropTypes


