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
    setValue,
    watch
  }


  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form className='flex flex-col w-full max-h-[90vh] items-center justify-center space-y-3 overflow-y-auto' onSubmit={handleSubmit(onSubmit)}>
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

