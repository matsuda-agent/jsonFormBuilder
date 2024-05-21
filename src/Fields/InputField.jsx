import React from 'react';
import { useFormContext } from 'react-hook-form';
import {Input , Field , Label, Description} from '@headlessui/react';
import {useStyle} from '../StyleProvider.tsx';
import clsx from 'clsx'


const InputField = ({ name  , AttributesKey:{fieldArrayName , key}  , AttributeSchema  }) => {

  const { title, description, type, isMandatory } = AttributeSchema[`${fieldArrayName}.${key}`];
  const { register, control, setValue, watch } = useFormContext();

  const {styles} = useStyle();


  return (
    <Field>
     {type === 'date' ? <Label className={styles.inputField.label}>{title}</Label>  : null} 
      <Input  {...register(name, { required: isMandatory })} 
            type={type} placeholder={title} className={styles.inputField.Input} />
      
    </Field>
  );
};

// InputField.propTypes = InputFieldAttributes; // Apply the predefined PropTypes

export default InputField;




// InputField.propTypes = InputFieldAttributes; // Apply the predefined PropTypes


