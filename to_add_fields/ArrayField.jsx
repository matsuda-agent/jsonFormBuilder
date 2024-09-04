import React, { useEffect } from 'react';
import { useFieldArray ,useFormContext } from 'react-hook-form';
// import {Input , Legend , Label, Description , Fieldset} from '@headlessui/react'
import Field from  '../src/Fields/Field.js';


const ArrayField = ({ name  , AttributesKey:{fieldArrayName , key}  , AttributeSchema , ResponseSchema })  => {
  const { title, description, type, isMandatory } = AttributeSchema[`${fieldArrayName}.${key}`];

  // form context 
  const { register, control, setValue, watch } = useFormContext();

  // define the field array
  const { fields, append, prepend, remove, swap, move, insert , update } = useFieldArray({
    control: control,
    name: name
  });

  // default fields
  const defaultFields = ResponseSchema[`${fieldArrayName}`][0][`${key}`][0];



  return (

    <div className='Array-FieldGrid'>
        <div className='Array-FieldSet'>
        
      {
          fields.map((field, index) => {
            return (
              <React.Fragment key={`${name}.${index}`}>
                <div className='header'>
                  <h1 className='h1'>{title} {index+1}</h1>
                </div>
                {
                  Object.keys(field).map((k, i) => {
                    const subkey = `${key}.${k}`;
                    if (k!='id'){
                      return (
                        <Field 
                          name={`${name}.${index}.${k}`}  
                          AttributesKey={{fieldArrayName , key : subkey}} 
                          AttributeSchema={AttributeSchema}  
                          key={`${name}.${index}.${subkey}.${i}`}
                          ResponseSchema={ResponseSchema}
                        />
                      );
                    }
                    return null; // Add this to handle the case when k === 'id'
                  })
                }
               </React.Fragment>
            );
          })
      }
        </div>
          <button type='button'  className='add-button'
          onClick={() => append(defaultFields)}>Add +</button>
    </div>
  );

};
export default ArrayField;
