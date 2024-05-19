import React , {useState , useEffect} from 'react'
import clsx from 'clsx' 
import  Field  from '../../Fields/Field.jsx';
import { useForm , useFieldArray, Controller , useWatch ,  FormProvider, useFormContext } from 'react-hook-form';


export function  MultiFormRender({RespsoneSchema , AttributeSchema}) {
    // extract tthe field array name and the fields from the schema
    const fieldArrayName = Object.keys(RespsoneSchema)[0];
    const defaultFields = RespsoneSchema[fieldArrayName];


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
      <div className='w-full gap-3 max-h-[90vh]'>
        <h1> Multi Applicant Form</h1>
        <FormProvider {...methods} >
          <form className='flex flex-col max-h-[90vh] items-center justify-center space-y-3 overflow-y-auto bg-white/5 rounded-md p-3' onSubmit={methods.handleSubmit(onSubmit)}>
            <div className='flex flex-row gap-3'>
            {
              fields.map((field , index) => {
                
                return (
                  <div key={field.id} className='flex flex-col gap-3 w-full max-w-[20vw]'>
                    <h1>Applicant {index + 1}</h1>
                    {
                      Object.entries(field)
                        .filter(([key]) => key !== 'id')
                        .map(([key , value] , i) => {

                          return (
                            <Field name={`${fieldArrayName}[${index}].${key}`}  Attributes={AttributeSchema[`${fieldArrayName}.${key}`]} key={key} />
                          
                          );
                        })
                    }
                    <button type='button' onClick={() => remove(index)} className="bg-red-400 text-white w-full max-w-52">Remove</button>
                  </div>
                );
              })
            }
            </div>
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
  
  