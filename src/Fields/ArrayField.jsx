import React, { useEffect } from 'react';
import { useFieldArray ,useFormContext } from 'react-hook-form';
import {Input , Legend , Label, Description , Fieldset} from '@headlessui/react'
import Field from  './Field.jsx';


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

    <div>
      <div>
      {
          fields.map((field, index) => {
            return (
              <React.Fragment key={`${name}.${index}`}>
                <p>{title} {index+1}</p>
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
          <button type='button' 
          onClick={() => append(defaultFields)}>Add Address</button>
    </div>
  );

};
// SelectField.propTypes = SelectFieldAttributes; // Apply the predefined PropTypes
export default ArrayField;


          // <Field key={k}>
                //   <Label className="text-sm/6 font-medium text-white">{AttributeSchema[`${fieldArrayName}.${key}.${k}`].title}</Label>
                //   <Input className={clsx(
                //     'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                //     'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                //   )}
                //   {...register(`${name}.${index}.${k}`)} />
           
                // </Field>
                // <Field 
                //       name={`${fieldArrayName}[${index}].${key}`}  
                //       AttributesKey={{fieldArrayName , key}} 
                //       AttributeSchema={AttributeSchema}  
                //       key={key} 
                //       ResponseSchema={ResponseSchema}  
                // />
