import React, { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import { SelectFieldAttributes } from './FieldAttributes'; // Adjust the path as necessary
import {Input , Field , Legend , Label, Description , Fieldset} from '@headlessui/react'
import clsx from 'clsx';

const ArrayField = ({ field :{id  , name, title , type, isMandatory , description , subFields} 
                      , formMethods: {register , control ,setValue}}) => {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control: control,
    name: name,
    fields : subFields
  });

  useEffect(() => {
    setValue(name, subFields)
  },[])


  return (

    <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
      <Legend className="text-base/7 font-semibold text-white">{title}</Legend>
      {
        fields.map((field, index) => {
          return (
          <Field key={field.id}>
            <Label className="text-sm/6 font-medium text-white">{field.title}</Label>
            <Input className={clsx(
              'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            {...register(`${name}.${field.id}`, { required: isMandatory })} type={field.type} id={field.id} />
        </Field>
          )
        })
      }
    </Fieldset>
  );

};
// SelectField.propTypes = SelectFieldAttributes; // Apply the predefined PropTypes
export default ArrayField;


