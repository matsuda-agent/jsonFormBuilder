import React from 'react'
import { Input , Button } from '@headlessui/react'
import clsx from 'clsx' 
import  Field  from './Fields/Field.jsx';
import { useForm , useFieldArray} from 'react-hook-form';

import MultiForm from './FormTypes/MultForm.tsx';
import Form from './FormTypes/Form.tsx';





export function  FormRender({schema}) {
 

  return (
    <div className='grid grid-cols-3 items-center justify-center gap-3 overflow-y-auto'>
      {
        schema.forms.map((form) => {
          if (form.formType === 'multi') {
            return <MultiForm key={form.formId} form={form}/>
          }
          return <Form key={form.formId} form={form}/>
        })
      }

    </div>
  )
}


