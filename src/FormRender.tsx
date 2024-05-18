import React from 'react'
import { Input , Button } from '@headlessui/react'
import clsx from 'clsx' 
import  Field  from './Fields/Field.jsx';
import { useForm , useFieldArray} from 'react-hook-form';

import MultiForm from './FormTypes/MultForm.tsx';
import Form from './FormTypes/Form.tsx';



import {  Controller } from 'react-hook-form';







export function  FormRender({schema}) {
 

  return (
    <div className='grid grid-cols-3 items-center justify-center gap-3 max-h-[90vh]'>
      {
        schema.forms.map((form) => {
          if (form.formType === 'multi') {
            return <MultiForm key={form.formId} form={form}/>
          }
          return <Form key={form.formId} form={form}/>
        })
      }

      <NestedForm />

    </div>
  )
}


const Applicant = ({ formMethods : {control, register} , index , fieldArrayName  ,schemaFields: {name, title , subFields}}) => {
  const { fields: addressFields, append: appendAddress, remove: removeAddress } = useFieldArray({
    control,
    name: `${fieldArrayName}[${index}].${nama}`
  });

  return (
    <div>
      <input className='text-black' {...register(`applicants[${index}].name`)} />

      {addressFields.map((addressField, addressIndex) => (
        <div key={addressField.id}>
          <input className='text-black' {...register(`applicants[${index}].addresses[${addressIndex}].street`)} />
          <input className='text-black' {...register(`applicants[${index}].addresses[${addressIndex}].city`)} />

          <button type="button" onClick={() => removeAddress(addressIndex)}>
            Remove Address
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => appendAddress({ street: 'default street' })}
      >
        Add Address
      </button>
    </div>
  );
};

function NestedForm() {
  const { register, control, handleSubmit } = useForm();
  const { fields: applicantFields, append: appendApplicant, remove: removeApplicant } = useFieldArray({
    control,
    name: 'applicants'
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const formMethods = {
    register,
    control
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      {applicantFields.map((applicantField, index) => (
        <div key={applicantField.id}>
          <Applicant formMethods={formMethods} index={index} fieldArrayName={fieldArrayName} />

          <button type="button" onClick={() => removeApplicant(index)}>
            Remove Applicant
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => appendApplicant({ name: 'default name', addresses: [{ street: 'default street' }] })}
      >
        Add Applicant
      </button>

      <button type="submit">Submit</button>
    </form>
  
    </>
  );
}

export default NestedForm;