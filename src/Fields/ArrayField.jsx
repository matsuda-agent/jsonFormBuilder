import React, { useEffect } from 'react';
import { useFieldArray ,useFormContext } from 'react-hook-form';
import { SelectFieldAttributes } from './FieldAttributes'; // Adjust the path as necessary
import {Input , Field , Legend , Label, Description , Fieldset} from '@headlessui/react'
import clsx from 'clsx';

const ArrayField = ({name, Attributes}) => {
  console.log(Attributes)

  // form context 
  const { register, control, setValue, watch } = useFormContext();

  // define the field array
  const { fields, append, prepend, remove, swap, move, insert , update } = useFieldArray({
    control: control,
    name: name
  });

  return (

    <Fieldset className="space-y-3 rounded-xl bg-white/5 p-6 sm:p-10">
      <Legend className="text-base/7 font-semibold text-white">{"Array Title"}</Legend>
        {
          fields.map((field, index) => {
            return Object.keys(field).map((key) => {
              if (key!='id'){
              return (
                
                <Field key={key}>
                  <Label className="text-sm/6 font-medium text-white">{key}</Label>
                  <Input className={clsx(
                    'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                  )}
                  {...register(`${name}.${index}.${key}`)} />
           
                </Field>
              );
            }
            })
          })
        }
    </Fieldset>
  );

};
// SelectField.propTypes = SelectFieldAttributes; // Apply the predefined PropTypes
export default ArrayField;


