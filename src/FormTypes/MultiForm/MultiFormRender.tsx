import React , {useState , useEffect, useMemo} from 'react'
import clsx from 'clsx' 
import  Field  from '../../Fields/Field.jsx';
import { useForm , useFieldArray, Controller , useWatch ,  FormProvider, useFormContext } from 'react-hook-form';
// In the user's application

import { MdAddCircleOutline } from "react-icons/md";
import {useStyle} from '../../StyleProvider.tsx';


export function  MultiFormRender({ResponseSchema , AttributeSchema  , submitFunction}) {
    // extract tthe field array name and the fields from the schema
    const fieldArrayName = Object.keys(ResponseSchema)[0];
    const defaultFields = ResponseSchema[fieldArrayName];

    // Initialize useForm outside of useEffect and useState
    const formMethods = useForm({
      defaultValues: {
       [fieldArrayName] : defaultFields
      },
      shouldUnregister : true
    });

    // Initialize state with formMethods
    const [methods, setMethods] = useState(formMethods);
    
    // Initialize useFieldArray outside of useEffect
    const { fields, append, remove } = useFieldArray({
      control: methods.control,
      name: fieldArrayName,
      shouldUnregister : true
    });
    


    const onSubmit = (data) => {
      submitFunction(data)
    }


    // importing styles 
    const {styles} = useStyle();



    return (
        <>
        <FormProvider {...methods} >
          <form className={styles.form.form} onSubmit={methods.handleSubmit(onSubmit)}>
            <div className={styles.form.button.div}>
                <button type='button' 
                        onClick={() => append(defaultFields)} 
                        className={styles.form.button.add}><MdAddCircleOutline  size={20}/> Add </button>

                <button type='submit'  
                        className={styles.form.button.submit}>Submit</button>
            </div>
            <div className={styles.form.grid.div}>
            {
              fields.map((field , index) => {
                
                return (      
                  <div className={styles.form.main.div} key={index}>
                      <div className='flex flex-row justify-between'>
                        <h1 className='text-xl font-bold font-serif'>Applicant {index + 1}</h1>
                        <button type='button' onClick={() => remove(index)} className={styles.form.button.remove}>Remove</button>
                      </div>

                      <div className={styles.form.fieldGrid.div}>

                    {
                      Object.entries(field)
                        .filter(([key]) => key !== 'id')
                        .map(([key , value] , i) => {

                          return (
                            <Field 
                              name={`${fieldArrayName}[${index}].${key}`}  
                              AttributesKey={{fieldArrayName , key}} 
                              AttributeSchema={AttributeSchema}  
                              key={`${value}${i}`} 
                              ResponseSchema={ResponseSchema}  
                              />
                          
                          );
                        })
                    }
                      </div>

                  </div>
                );
              })
            }
            </div>
      
          </form>
        </FormProvider>
        </>
    )
  }
  
export default MultiFormRender;