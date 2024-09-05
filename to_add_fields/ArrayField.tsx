import React, { useEffect } from 'react';
import { useFieldArray ,useFormContext } from 'react-hook-form';
// import {Input , Legend , Label, Description , Fieldset} from '@headlessui/react'

import {Input} from '../UI/Input';
import { Controller } from 'react-hook-form';
import Field from  './Field';


const ArrayField = ({ applicant, applicantIndex, addresses , applicantFields})  => {
  const { register  , control } = useFormContext();

  const { append } = useFieldArray({
    control: control,
    name: `applicants.${applicantIndex}.addresses`
  });



    // Function to append a new address to a specific applicant
    const appendAddress = () => {
      console.log('applicantFields' ,applicantFields )
      // append({
      //   array_index: applicantFields[applicantIndex].addresses.length + 1,
      //   fields: {},
      //   metadata: []
      // });
    };

  // const handleAppend = () => {
  //   console.log('address', addresses)
  //   const newAddress = addresses[addresses.length - 1];
  //   newAddress.array_index = addresses.length;
  //   console.log('newAddress', newAddress)
  //   appendAddress(newAddress);
  // }

  return (

    <div className='Array-FieldGrid'>
        {addresses.map((address, addressIndex) => {
          if (!address.array_index){
            // array index 0 is not defined
            return null 
          }

          console.log('address', address)
         return (     
          <div key={addressIndex} className='Array-FieldSet'>
             <h5>Address {address.array_index}</h5>
            {address.metadata.map((addressfield, index) => {

                console.log('field', addressfield) 
                const name = `applicants.${applicant.applicant_loan_application_id}.addresses.${address.array_index}.${addressfield.field_name}`
                console.log('name', name)
              
              return (
              <div key={index}>
                <label>{addressfield.title}</label>

                <Controller 
                      control={control}
                      name={name}
                      rules={{
                        required: addressfield?.is_required ? 'This field is required' : false ,
                        ...addressfield?.validations
                      }}
                      render={({ field}) => (
                        <Input
                          {...field}
                          placeholder={`Enter ${addressfield.title}`}
                          type={addressfield.type}
                        />
                      )}
                    />
                {/* <Field
                  name={name}
                  Attributes = {
                      {type: field.field_type,
                      title: field.title,
                      description: field.description,
                      is_required: field.is_required,
                      options: field?.options,
                      dependantOn: field?.dependantOn
                      }
                    }
                  validations={field?.validations}  
                  /> */}
              </div>
              )}

            )}

          </div>
          
    
        )}
      )}

        <button type='button'  className='add-button'
                 onClick={appendAddress}>Add +
                 
      </button>
    </div>
  );

};
export default ArrayField;



{/* <div key={addressIndex} className='Array-FieldSet'>
{address.metadata.map((field, index) => (
<div key={index}>
  <label>{field.title}</label>
  <input
    {...register(`applicants.${applicant.applicant_loan_application_id}.addresses.${address.array_index}.${field.field_name}`)}
    defaultValue={address.fields[field.field_name]}
    placeholder={field.description}
  />
  {field.is_required && (
    <p style={{ color: 'red' }}>This field is required</p>
  )}
</div>
))}
<Field
    name={`applicants.${applicantIndex}.addresses.${addressIndex}.${addressField.field_name}`}
    Attributes = {
        {type: addressField.field_type,
        title: addressField.title,
        description: addressField.description,
        is_required: addressField.is_required,
        options: addressField?.options,
        dependantOn: addressField?.dependantOn
        }
      }
    validations={addressField?.validations}  
    />

</div> */}