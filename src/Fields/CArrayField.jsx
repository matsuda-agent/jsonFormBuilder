import React, { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import { SelectFieldAttributes } from './FieldAttributes'; // Adjust the path as necessary
import {Input , Field , Legend , Label, Description , Fieldset} from '@headlessui/react'
import clsx from 'clsx';

const CArrayField = ({ field :{id  , name, title , type, isMandatory , description , subFields} 
                      , formMethods: {register , control ,setValue ,watch}}) => {

  const { fields, append, prepend, remove, swap, move, insert , update } = useFieldArray({
    control: control,
    name: name
  });

  useEffect(() => {
    if(fields.length === 0){
        update(0,{'postcode' :'' , 'Country' : ''});
      }
  },[])


  const watchFields = watch(name);
  console.log('watchFields', watchFields);

  useEffect(() => {
    if(watchFields && watchFields.length > 0 && watchFields[watchFields.length-1].Country === 'a'){
        append({'postcode' :'' , 'Country' : ''});
    }
  },[watchFields?.[watchFields.length-1].Country]
)





  return (

    <Fieldset className="space-y-3 rounded-xl bg-white/5 p-6 sm:p-10">
      <Legend className="text-base/7 font-semibold text-white">{title}</Legend>
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
export default CArrayField;


