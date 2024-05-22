import React , {useState , useEffect, useMemo} from 'react'
import clsx from 'clsx' 
import  Field  from '../../Fields/Field.jsx';
import { useForm , useFieldArray, Controller , useWatch ,  FormProvider, useFormContext } from 'react-hook-form';
// In the user's application

import { MdAddCircleOutline } from "react-icons/md";
import {useStyle} from '../../StyleProvider.tsx';


export function  SingleFormRender({ResponseSchema , AttributeSchema  , submitFunction}) {
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
                <button type='submit'  
                        className={styles.form.button.submit}>Submit</button>
            </div>
            <div className={styles.form.grid.div}> 
                  <div className={styles.form.main.div}>
                      <div className={styles.form.fieldGrid.div}>

                    {
                      Object.entries(defaultFields)
                        .filter(([key]) => key !== 'id')
                        .map(([key , value] , i) => {

                          // check if the field is dependant then don't render 
                          if(AttributeSchema[`${fieldArrayName}.${key}`].dependantOn){
                            return null;
                          }

                          return (
                            <Field 
                              name={`${key}`}  
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
            </div>
      
          </form>
        </FormProvider>
        </>
    )
  }
  
export default SingleFormRender;