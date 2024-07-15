import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import {Input , Field , Label, Description} from '@headlessui/react';
import { useState } from 'react';
import clsx from 'clsx'
import { ErrorMessage } from "@hookform/error-message"


const InputField = ({ name  , AttributesKey:{fieldArrayName , key}  , AttributeSchema  }) => {

  const [fieldErrors , setfieldErrors] = useState(null)
  const { title, description, type, isMandatory , validations } = AttributeSchema[`${fieldArrayName}.${key}`];
  const { register, control, setValue, watch , formState: {errors} } = useFormContext();


  return (
    <Field>
     <Label className="basic-input-label">{title}</Label> 
      <Input  {...register(name,  validations)} 
            type={type} placeholder={`Enter ${title}`}  className="basic-input" />

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


