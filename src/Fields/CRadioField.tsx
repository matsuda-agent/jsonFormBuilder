
import React from 'react';
import { useFormContext , Controller } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"
import get from 'lodash-es/get';
import useDependantFieldStore from '../store/useDependantFieldStore'  



import {
    RadioCardGroup,
    RadioCardIndicator,
    RadioCardItem,
  } from "../UI/RadioCardGroup"
  



interface CRadioFieldProps {
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


const CRadioField:React.FC<CRadioFieldProps>  = ({ name  , Attributes:{ description , is_required , options }  , validations  }) => {
  const { control, formState: {errors}   } = useFormContext();
  const setDependantField = useDependantFieldStore(state => state.setDependantField)

  // get the errors 
  const error = get(errors, name)


  return (
    <div className='col-span-2'>
      <label className={`${error ? 'select-input-label-error' : 'select-input-label'}`}>
        {description}
      </label>
      <Controller 
        control={control}
        name={name}
        rules={{
          required: is_required ? 'This field is required' : false ,
          ...validations
        }}
        render={({ field : {value , onChange  } }) => (
        <RadioCardGroup  defaultValue={value} onValueChange={(value) => { onChange(value); setDependantField(name , value)}} className="grid-cols-2 text-sm">
            {options && options.map((option : {value: string , label:string} , index :number) => (   
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


