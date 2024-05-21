import React, { useEffect } from 'react';
import { useFieldArray ,useFormContext } from 'react-hook-form';
import {Input , Field , Legend , Label, Description , Fieldset} from '@headlessui/react'
import clsx from 'clsx';

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
  const defaultFields = ResponseSchema[`${fieldArrayName}`][0][`${key}`];

  return (

    <Fieldset className="space-y-3 rounded-xl bg-white/5 p-6 sm:p-10">
      <Legend className="text-base/7 font-semibold text-white">{title}</Legend>
        {
          fields.map((field, index) => {
            return Object.keys(field).map((k) => {
              if (k!='id'){
              return (
                
                <Field key={k}>
                  <Label className="text-sm/6 font-medium text-white">{AttributeSchema[`${fieldArrayName}.${key}.${k}`].title}</Label>
                  <Input className={clsx(
                    'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                  )}
                  {...register(`${name}.${index}.${k}`)} />
           
                </Field>
              );
            }
            })
          })
        }
        <button type='button' 
        onClick={() => append(defaultFields)} 
        className="bg-purple-400 text-white w-full max-w-52">Add Address</button>
    </Fieldset>
  );

};
// SelectField.propTypes = SelectFieldAttributes; // Apply the predefined PropTypes
export default ArrayField;


