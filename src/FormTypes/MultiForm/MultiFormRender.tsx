import React , {useState , useEffect} from 'react'
import clsx from 'clsx' 
import  Field  from '../../Fields/Field.jsx';
import { useForm , useFieldArray, Controller , useWatch ,  FormProvider, useFormContext } from 'react-hook-form';
// In the user's application

import { MdAddCircleOutline } from "react-icons/md";
import {useStyle} from '../../StyleProvider.tsx';


export function  MultiFormRender({ResponseSchema , AttributeSchema }) {
    // extract tthe field array name and the fields from the schema
    const fieldArrayName = Object.keys(ResponseSchema)[0];
    const defaultFields = ResponseSchema[fieldArrayName];
    // importing styles 
    const {styles} = useStyle();
   

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
        <>
        <FormProvider {...methods} >
          <form className={styles.form.form} onSubmit={methods.handleSubmit(onSubmit)}>
            <div className={styles.form.heading}>
              <h1>Applicants Personal Details</h1>
            </div>
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
                  <div className={styles.form.main.div}>
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
                              key={key} 
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