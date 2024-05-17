import React from 'react'
import { Input , Button } from '@headlessui/react'
import clsx from 'clsx' 
import  Field  from '../Fields/Field.jsx';
import { useForm , useFieldArray} from 'react-hook-form';



const Edit = ({fieldValues: {index, field} , formMethods: { control } , arrayMethods:{update} , schemaFields}) => {
    const { register, handleSubmit } = useForm({
      defaultValues: field 
    });
  
  
    return (
      <div className='flex flex-col'>

    {field && Object.keys(field).map((key , i) => {
          if (key !== 'id'){
          return (
                <Field key={key} 
                    field={schemaFields[i]} 
                    formMethods={{control , register}}
                />
          );
        }
  
        })
        }           
  
        <button
          type="button"
          className='bg-white rounded-lg text-black my-3'
          onClick={handleSubmit((data) => {
            update(index, data);
            console.log(data);
          })}
        >
          Update
        </button>
      </div>
    );
  };



const MultiForm = ({form}) => {
    // extract the default values from the form
      const defaultValues = form.fields.reduce((acc : Record<string , any>  , current_value) => {
        acc[current_value.name] = '';
        return acc;
      }, {})
    
      const { register, handleSubmit, control, watch, formState: { errors } , setValue } = useForm({
        defaultValues: {
          array: [
            defaultValues
            ]
        }
      });
    
      const formMethods = {
        register,
        control,
        setValue,
        watch
      }
      const { fields, append, update, remove } = useFieldArray({
        control,
        name: "array"
      });
      const onSubmit = (data) => {
        console.log(data)
      }
    
      return (
        <form className='flex flex-col w-full max-h-[90vh] items-center justify-center space-y-3 overflow-y-auto bg-white/5 rounded-md p-3' onSubmit={handleSubmit(onSubmit)}>
            <h1 className='text-2xl font-bold text-center'>{form.title}</h1>
            {fields.map((field ,index) => {
                return <Edit key={field.id} 
                              fieldValues={{index, field}} 
                              formMethods={formMethods}
                              arrayMethods= {{ update }}
                              schemaFields={form.fields}
                              />
              })
              
            }
            
          <Button type='submit' className="bg-purple-400 text-white w-full max-w-52">Submit</Button>
    
          <Button type='button' 
                  onClick={() => {
                    append(defaultValues);
                  }}
                  className="bg-purple-400 text-white w-full max-w-52">{form.appendButtonName}</Button>
         
        </form>
      );
    };

export default MultiForm;