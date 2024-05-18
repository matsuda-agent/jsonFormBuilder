import React , {useState , useEffect} from 'react'
import clsx from 'clsx' 
// import  Field  from '../Fields/Field.jsx';
import { useForm , useFieldArray, Controller , useWatch ,  FormProvider, useFormContext } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";


 // Adjust the import path as necessary
import {Input , Field , Label, Description} from '@headlessui/react'


const InputField = ({ name  , Attributes : {title , description , type ,isMandatory }}) => {
  const { register, control, setValue, watch } = useFormContext();

  return (
    <Field className="my-3">
      <Label className="text-sm/6 font-medium text-white">{title}</Label>
      <Description className="text-sm/6 text-white/50">{description}</Description>
      <Input className={clsx(
              'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            {...register(name, { required: isMandatory })} type={type} />
      
    </Field>
  );
};




export function  MultiFormRender({RespsoneSchema , AttributeSchema}) {
    // extract tthe field array name and the fields from the schema
    const fieldArrayName = Object.keys(RespsoneSchema)[0];
    const defaultFields = RespsoneSchema[fieldArrayName];

    console.log(AttributeSchema)

    const methods = useForm(
      {
        defaultValues: {
          [fieldArrayName]: defaultFields
        }
      }
    );



    const onSubmit = (data) => {
      console.log(data)
    }


    const { fields, append, remove } = useFieldArray({
      control: methods.control,
      name: fieldArrayName
    });

    return (
      <div className='grid grid-cols-3 items-center justify-center gap-3 max-h-[90vh]'>
        <h1> Multi Applicant Form</h1>
        <FormProvider {...methods} >
          <form className='flex flex-col w-full max-h-[90vh] items-center justify-center space-y-3 overflow-y-auto bg-white/5 rounded-md p-3' onSubmit={methods.handleSubmit(onSubmit)}>
            {
              fields.map((field , index) => {
                return (
                  <div key={field.id} className='flex flex-col gap-3'>
                    <h1>Applicant {index + 1}</h1>
                    {
                      Object.entries(field)
                        .filter(([key]) => key !== 'id')
                        .map(([key , value] , i) => {
                          return (
                            <InputField name={`${fieldArrayName}[${index}].${key}`}  Attributes={AttributeSchema[`${fieldArrayName}.${key}`]} key={key} />
                          
                          );
                        })
                    }
                    <button type='button' onClick={() => remove(index)} className="bg-red-400 text-white w-full max-w-52">Remove</button>
                  </div>
                );
              })
            }
            <button type='button' 
                    onClick={() => append(defaultFields)} 
                    className="bg-purple-400 text-white w-full max-w-52">Add Applicant</button>

            <button type='submit'  
                    className="bg-green-400 text-white w-full max-w-52">Submit</button>
          </form>
        </FormProvider>


      </div>
    )
  }
  
  