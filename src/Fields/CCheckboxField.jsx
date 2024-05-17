import React , {useEffect, useState} from 'react';
import { useFormContext , Controller } from 'react-hook-form';
import { InputFieldAttributes, FieldType } from './FieldAttributes'; // Adjust the import path as necessary
import {Checkbox , Field , Label, Description , Input} from '@headlessui/react'
import { FaCheck } from "react-icons/fa";
import clsx from 'clsx'

const CCheckboxField = ({ field :{id  , name, title , type, isMandatory , description , subFields}
                    ,   formMethods : {register , control ,setValue ,watch}  , index}) => {

  const watchFields = watch(name);

  useEffect(() => {
    if(watchFields === false){
      subFields.forEach(field => {
        setValue(field.name, '')
      })
    }
    }  ,[watchFields])


  return (
    //  <Field className="w-full">
    
    //   <Description className="text-sm/6 text-white/50">{description}</Description>
    <div className="flex items-center">
     
      <div className='flex flex-col gap-y-4'> 
          <div className='flex flex-row justify-between space-x-3'>
              <span className="text-sm/6 font-medium text-white">{description}</span>
              <Controller
                  control={control}
                  name={name} // Adjust the name prop
                  rules={{ required: isMandatory }}
                  render={({ field: { onChange, onBlur, value, ref } })  => (

                  <Checkbox 
                    className="group size-6 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
                    onChange={onChange}
                    as="div"
                    value={value}
                    >                    
                    <FaCheck className="hidden size-4 fill-black group-data-[checked]:block" />
                  </Checkbox>
                  )} />
            </div>
        {
          watchFields ? (
              subFields.map((field, i) => {
                  return (
                    <Field key={field.id}>
                      <Label className="text-sm/6 font-medium text-white">{field.title}</Label>
                      <Input className={clsx(
                        'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                      )}
                      {...register(field.name)} />
                
                    </Field>
                  );
              })
          ) : null 
        }
      </div>
    </div>
  );
};

// InputField.propTypes = InputFieldAttributes; // Apply the predefined PropTypes

export default CCheckboxField;




// InputField.propTypes = InputFieldAttributes; // Apply the predefined PropTypes


