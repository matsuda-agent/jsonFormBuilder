// import React from 'react'
// import { Input , Button } from '@headlessui/react'
// import clsx from 'clsx'
// import  Field  from '../Fields/Field.jsx';
// import { useForm , useFieldArray} from 'react-hook-form';
//
//
//
//
// const Form = ({form}) => {
//     const { register, handleSubmit, control, watch, formState: { errors } , setValue } = useForm();
//
//     const formMethods = {
//       register,
//       control,
//       setValue,
//       watch
//     }
//
//     const onSubmit = (data) => {
//       console.log(data)
//     }
//
//     console.log('form', form);
//
//     return (
//       <form className='flex flex-col w-full max-h-[90vh] items-center justify-center space-y-3 overflow-y-auto bg-white/5 rounded-md p-3' onSubmit={handleSubmit(onSubmit)}>
//           <h1 className='text-2xl font-bold text-center'>{form.title}</h1>
//           {form.fields.map((field) => {
//               return <Field key={field.id}
//                             field={field}
//                             form={form}
//                             formMethods={formMethods}/>
//             })
//
//           }
//
//         <Button type='submit' className="bg-purple-400 text-white w-full max-w-52">Submit</Button>
//
//       </form>
//     )
//
//   }
//
//   export default Form;
import React from 'react'
import { Input, Button } from '@headlessui/react'
import clsx from 'clsx'
import Field from '../Fields/Field.jsx';
import { useForm, FormProvider } from 'react-hook-form';

const Form = ({ form }) => {
  const methods = useForm();
  const { handleSubmit, formState: { errors } } = methods;

  const onSubmit = (data) => {
    console.log(data)
  }

  console.log('form', form);

  return (
    <FormProvider {...methods}>
      <form className='flex flex-col w-full max-h-[90vh] items-center justify-center space-y-3 overflow-y-auto bg-white/5 rounded-md p-3' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-2xl font-bold text-center'>{form.title}</h1>
        {form.fields.map((field) => {
          return (
            <Field
              key={field.id}
              field={field}
              form={form}
              formMethods={methods}
            />
          )
        })}
        <Button type='submit' className="bg-purple-400 text-white w-full max-w-52">Submit</Button>
      </form>
    </FormProvider>
  )
}

export default Form;