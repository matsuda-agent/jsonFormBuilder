import React , {useEffect, useState} from 'react';
import { useFormContext , Controller } from 'react-hook-form';
import {Checkbox , Field , Label, Description , Input} from '@headlessui/react'
import {useStyle} from '../StyleProvider.tsx';
import { FaCheck } from "react-icons/fa";

const CCheckboxField = ({ name  , AttributesKey:{fieldArrayName , key}  , AttributeSchema  , index }) => {


  const { title, description, type, isMandatory , subFields } = AttributeSchema[`${fieldArrayName}.${key}`];
  const { register, control, setValue, watch } = useFormContext();
  const {styles} = useStyle();

 
  // extract the sub fields 
  const responseSubFields = subFields.map((field , i) => {
    if(index !== undefined){
      return {
        name: `${fieldArrayName}[${index}].${field}`
      }
    } else {
    return {
      name: `${field}`
    }
  }
  })

  console.log('responseSubFields', responseSubFields)


// watch the checkbox to be checked
  const watchFields = watch(name);
  useEffect(() => {
    if(watchFields === false){
      responseSubFields.forEach(field => {
        setValue(field.name, '')
      })
    }
    }  ,[watchFields])


  return (
    <Field>
      <div className='flex flex-row w-full justify-between'>
      <Label className={styles.ccheckboxField.Label}>{title}</Label>
              <Controller
                  control={control}
                  name={name} // Adjust the name prop
                  rules={{ required: isMandatory }}
                  render={({ field: { onChange, onBlur, value, ref } })  => (

                  <Checkbox 
                    className={styles.ccheckboxField.Checkbox}
                    onChange={onChange}
                    as="div"
                    value={value}
                    >   
                    <FaCheck className="hidden size-4 fill-white group-data-[checked]:block" />
                  </Checkbox>
                  )} />
      </div>
        {
          watchFields ? (
            responseSubFields.map((field, i) => {
              let attr;
              if (index !== undefined){
                let field_name = field.name.split(".")[1];
                attr = AttributeSchema[`${fieldArrayName}.${field_name}`]
              }
              else{
                 attr = AttributeSchema[`${fieldArrayName}.${field.name}`]
              }
                  return (
                    <Field key={i}>
                      <Input 
                      type={attr.type}
                      className={styles.inputField.Input}
                      placeholder={attr.title}
                      {...register(field.name)} />
                
                    </Field>
                  );
              })
          ) : null 
        }
    </Field>
  );
};

// InputField.propTypes = InputFieldAttributes; // Apply the predefined PropTypes

export default CCheckboxField;




// InputField.propTypes = InputFieldAttributes; // Apply the predefined PropTypes


