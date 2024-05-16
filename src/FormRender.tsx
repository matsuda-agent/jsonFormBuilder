import React from 'react'
import { Input , Button } from '@headlessui/react'
import clsx from 'clsx' 
import  Field  from './Fields/Field.jsx';
import { useForm } from 'react-hook-form';



export function  FormRender({schema}) {
  const { register, handleSubmit, control, watch, formState: { errors } , setValue } = useForm();

  const formMethods = {
    register,
    control,
    setValue
  }


  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form className='flex flex-col w-full h-full items-center justify-center space-y-6' onSubmit={handleSubmit(onSubmit)}>
      {schema.fields.map((field) => {
          return <Field key={field.id} 
                        field={field} 
                        formMethods={formMethods}/>
        })
        
      }
      <Button type='submit' className="bg-purple-400 text-white">Submit</Button>
     
    </form>
  )
}


