import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import {Input , Field , Label, Description} from '@headlessui/react';
import { useState } from 'react';
import clsx from 'clsx'
import { ErrorMessage } from "@hookform/error-message"
import get from 'lodash-es/get';


const InputField = ({ name  , AttributesKey:{fieldArrayName , key}  , AttributeSchema  }) => {

  const { title, description, type, isMandatory , validations } = AttributeSchema[`${fieldArrayName}.${key}`];
  const { register, control, setValue, watch , formState: {errors} } = useFormContext();

  // get the errors 
  const error = get(errors, name)

  return (
    <Field>
     <Label className={`${error ? 'basic-input-label-error' : 'basic-input-label'}`}>
      {title}
      </Label> 
      <Input  {...register(name,  validations)} 
            type={type} placeholder={`Enter ${title}`}  
            className={`${error ? 'basic-input-error' : 'basic-input'}`} />

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

        

    </Field>
  );
};

// InputField.propTypes = InputFieldAttributes; // Apply the predefined PropTypes

export default InputField;




// InputField.propTypes = InputFieldAttributes; // Apply the predefined PropTypes


