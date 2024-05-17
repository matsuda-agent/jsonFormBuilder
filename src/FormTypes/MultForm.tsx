import React , {useState , useEffect} from 'react'
import { Input , Button } from '@headlessui/react'
import clsx from 'clsx' 
import  Field  from '../Fields/Field.jsx';
import { useForm , useFieldArray, Controller , useWatch} from 'react-hook-form';


// const PhoneField = ({ field, formMethods: { control, register }, index }) => {};

const Edit = ({fieldValues: {index, field} , formMethods: { control } , arrayMethods:{update} , schemaFields}) => {
    const { register ,handleSubmit , setValue  } = useForm({
      defaultValues: field 
    });

    const [formData , setFormData] = useState({})

    const onSubmit = (data) => {

        update(index, formData);
      };
    

    const data = useWatch({
        control,
        name: `array.${index}`
      });
    

    
    useEffect(() => {
        console.log(data)
        setFormData(data)
    }, [data])

    
  
    return (
      <div className='flex flex-col'>

            {field && Object.keys(field).map((key , i) => {
            
                if (key !== 'id'){
                return (
                        <Field key={key} 
                            field={schemaFields[i]} 
                            index={index}
                            formMethods={{control , register}}
                        />
                        )
                };
                if(key === 'id'){
                    return (
                        <Input className={clsx(
                            'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                          )}
                          {...register("id", { required: "true" })} 
                          key = {key}
                          />
                    )
                } 
        
                })
                }           
        
        <button
          type="button"
          className='bg-white rounded-lg text-black my-3'
          onClick={handleSubmit(onSubmit)}
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
      console.log(defaultValues)
    
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
        watch,
        handleSubmit
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