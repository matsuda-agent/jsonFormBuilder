import React , {useEffect, useState} from 'react';
import { useFormContext , Controller } from 'react-hook-form';
// import {Checkbox , Field , Label, Description , Input} from '@headlessui/react'
import { FaCheck } from "react-icons/fa";

const CCheckboxField = ({ name  , AttributesKey:{fieldArrayName , key}  , AttributeSchema  , index }) => {


  const { title, description, type, isMandatory , subFields } = AttributeSchema[`${fieldArrayName}.${key}`];
  const { register, control, setValue, watch } = useFormContext();
  const [isChecked, setIsChecked] = useState(false);
 
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
    <Field className="ccheckbox-fieldset">
      <div className='flex flex-row  w-full items-center'>
      <Label className="ccheckbox-label">{title}</Label>
              <Controller
                  control={control}
                  name={name} // Adjust the name prop
                  rules={{ required: isMandatory }}
                  render={({ field: { onChange, onBlur, value, ref } })  => (

                  <Checkbox 
                    onChange={onChange}
                    as="div"
                    value={value}
                    className="ccheckbox-input"
                    >   

                    {value===true ? <FaCheck className="ccheckbox-icon"/>: null}
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
                      <Input 
                      type={attr.type}
                      placeholder={attr.title}
                      className="basic-input"
                      {...register(field.name)} key={i} />
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


