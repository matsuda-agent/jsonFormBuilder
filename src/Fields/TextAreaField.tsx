import React from "react";

import {
    Textarea 
} from "../UI/TextArea";


import { useFormContext , Controller } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"
import get from 'lodash-es/get';
import { Label} from '../UI/Label';



interface TextAreaFieldProps {
  name: string;
  Attributes: {
    type: string;
    title: string;
    disabled?: boolean;
    description: string; // Make description optional
    is_required: boolean;
    options?: any; // Replace 'any' with the actual type if known
    dependant_on?: any; // Replace 'any' with the actual type if known
    hidden?: boolean;
  };
  validations?: any; // Replace 'any' with the actual type if known
}


const TextAreaField: React.FC<TextAreaFieldProps> = ({ name  , Attributes:{title, disabled, description, is_required }  , validations  }) => {

    const {control, formState: {errors} } = useFormContext();

    const error = get(errors, name)

    return (
        <div className='col-span-2'>
            <div className="flex flex-col mb-2">
                <Label className="font-bold"> {title} </Label>
                <Label className="font-light text-xs"> {description} </Label>
            </div>
            <Controller 
                control={control}
                name={name}
                rules={{
                    required: is_required ? 'This field is required' : false ,
                    ...validations
                }}
                render={({ field : {value , onChange  } }) => (
                    <Textarea 
                        defaultValue ={value}
                        disabled={disabled}
                        placeholder="Enter text here"
                         onChange={onChange}
                         hasError={!!error}
                         
                         />
                )}
            />
            <ErrorMessage errors={errors} name={name} render={({ message }) => <p className='error-message'>{message}</p>} />
        </div>
    )
}
export default TextAreaField;