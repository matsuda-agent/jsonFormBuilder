import React , {useState , useEffect, useMemo} from 'react'
import clsx from 'clsx' 
import  Field  from '../../Fields/Field.jsx';
import { useForm , useFieldArray  ,  FormProvider } from 'react-hook-form';
// In the user's application

import { MdAddCircleOutline } from "react-icons/md";


export function  MultiFormRender({ResponseSchema , AttributeSchema  , submitFunction}) {
    // extract tthe field array name and the fields from the schema
    const fieldArrayName = Object.keys(ResponseSchema)[0];
    const defaultFields = ResponseSchema[fieldArrayName];

    // Initialize useForm outside of useEffect and useState
    const formMethods = useForm({
      defaultValues: {
       [fieldArrayName] : defaultFields
      },
      shouldUnregister : true,
       criteriaMode: "all"
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





    return (
        <FormProvider {...methods} >
          <form  onSubmit={methods.handleSubmit(onSubmit)} className='Multi-Form'>
            <div className='ToolBar'>
                <button type='button' 
                        className='add-button'
                        onClick={() => append(defaultFields)} 
                        ><MdAddCircleOutline  size={20}/> Add </button>

                <button type='submit'   className='submit-button'
                        >Submit</button>
            </div>
            <div className='Field-Grid'>
            {
              fields.map((field , index) => {
                
                return (      
                  <div className='Field-Section' key={index}>
                      <div className='Field-Section-header'>
                        <h1 className="h1">Applicant {index + 1}</h1>
                        <button className='remove-button' type='button' onClick={() => remove(index)}>Remove</button>
                      </div>

                      <div className='FieldSet'>

                    {
                      Object.entries(field)
                        .filter(([key]) => key !== 'id')
                        .map(([key , value] , i) => {

                          // check if the field is dependant then don't render 
                          if(AttributeSchema[`${fieldArrayName}.${key}`].dependantOn){
                            return null;
                          }

                          return (
                            <Field 
                              name={`${fieldArrayName}.${index}.${key}`}  
                              AttributesKey={{fieldArrayName , key}} 
                              AttributeSchema={AttributeSchema}  
                              key={`${value}${i}`} 
                              ResponseSchema={ResponseSchema}  
                              index={index}
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
    )
  }
  
export default MultiFormRender;