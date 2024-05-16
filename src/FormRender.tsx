import React from 'react'
import { Input , Button } from '@headlessui/react'
import clsx from 'clsx'



const Field = ({field}) => {
  return (
    <>
    <label>{field.title}</label>
    <Input className="bg-gray-100 border-2 border-blue-400 text-white h-[60px] w-[200px]"
            type={field.type} placeholder={field.title} />
    </>
  )
}


export function  FormRender({schema}) {
  console.log('Form Schema' , schema)
  return (
    <form className='flex flex-col w-full h-full items-center justify-center'>
      {schema.fields.map((field) => {
          return <Field key={field.id} 
                        field={field} />
        })
        
      }

      <Button className="bg-purple-400 text-white w-[200px] h-[40px]">Submit</Button>
     
    </form>
  )
}


