import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { SelectFieldAttributes } from './FieldAttributes'; // Adjust the path as necessary
import {Input , Field , Label, Description} from '@headlessui/react'

const ArrayField = ({ field :{id  , name, title , type, isMandatory , description}, formMethods: {register , control}}) => {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control: control,
    name: name,
  });

  return (
    <div>
      {
        fields.map((field, index) => {
          <Input className={clsx(
            'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
          )}
          {...register(`${name}.${index}.first`, { required: isMandatory })} type={type} id={id} />

        })
      }
    </div>
  );
  
};

// SelectField.propTypes = SelectFieldAttributes; // Apply the predefined PropTypes

export default ArrayField;


