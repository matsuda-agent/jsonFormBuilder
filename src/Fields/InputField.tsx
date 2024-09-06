import React, { useEffect , useState , useMemo } from 'react';
import { useFormContext , Controller } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"
import get from 'lodash-es/get';
import {Input } from '../UI/Input'

import useDependantFieldStore from '../store/useDependantFieldStore' ;
import { Label} from '../UI/Label';



interface InputFieldProps {
  name: string;
  Attributes: {
    type: string;
    title: string;
    disabled: boolean;
    description: string; // Make description optional
    is_required: boolean;
    options?: any; // Replace 'any' with the actual type if known
    dependant_on?: any; // Replace 'any' with the actual type if known
  };
  validations?: any; // Replace 'any' with the actual type if known
}


const InputField: React.FC<InputFieldProps> = ({ name  , Attributes:{title, disabled, description, type , is_required , dependant_on}  , validations  }) => {

  const {control, formState: {errors} } = useFormContext();


  // get the errors 
  const error = get(errors, name)


  const dependantFields = useDependantFieldStore(state => state.dependantFields)

 
  // this is using the depandat field provider, it also matches the field, it also takes into account the arra 
  const [show , setShow] = useState(dependant_on ? false : true)

  // Compute the specific key to watch
  const watchfield = useMemo(() => {
    if (dependant_on) {
      const parts = name.split('.');
      parts[parts.length - 1] = dependant_on.field_name;
      return parts.join('.');
    }
    return null;
  }, [name, dependant_on]);


  // Effect to update show state based on the specific key in dependantFields
  useEffect(() => {
    if (dependant_on && watchfield) {
      console.log(dependantFields[watchfield] , name . dpe , dependant_on.field_value)
      if (dependantFields[watchfield] === dependant_on.field_value) {
        setShow(true);
      } else {
        setShow(false);
      }
    }
  }, [dependantFields, watchfield && dependantFields[watchfield], dependant_on, watchfield]);

  if (show === false) {
    return (
      <div className='hidden'>
        <label className={`${error ? 'basic-input-label-error' : 'basic-input-label'}`}>{title}</label>
      </div>
    );
  }

  return (
    <div className='grid gap-2'>
      <Label htmlFor="r1"
      >
        {description}

      </Label>
      <Controller 
      control={control}
      name={name}
      rules={{
        required: is_required ? 'This field is required' : false ,
        ...validations
      }}
      render={({ field}) => (
        <Input
          {...field}
          placeholder={`Enter ${title}`}
          disabled={disabled}
          type={type}
          className='py-1'
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


