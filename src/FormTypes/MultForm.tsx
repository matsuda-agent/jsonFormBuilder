import React , {useState , useEffect} from 'react'
import { Input , Button } from '@headlessui/react'
import clsx from 'clsx' 
import  Field  from '../Fields/Field.jsx';
import { useForm , useFieldArray, Controller , useWatch} from 'react-hook-form';
import { DevTool } from "@hookform/devtools";


// const PhoneField = ({ field, formMethods: { control, register }, index }) => {};

// structure of the code 
// mutlie form for for each applicant 


const SubFieldForm = ({ field , formMethods : {control, register} , index , fieldArrayName  ,schemaFields: {name, title , subFields}}) => {

    const { fields: addressFields, append: appendAddress, remove: removeAddress } = useFieldArray({
        control,
        name: `${fieldArrayName}[${index}].${name}`
      });
      console.log('SubFieldForm' , `${fieldArrayName}[${index}].${name}`)
      console.log('SubFieldForm' , addressFields)

      return (
        <div>
    
          {addressFields.map((addressField, addressIndex) => (
            <div key={addressField.id}>
                {Object.keys(addressField).map ((field , i) => {

                    return (
                        <Input key={field}
                            placeholder={field}
                            className='text-black'
                            {...register(`${fieldArrayName}[${index}].${name}[${addressIndex}].${field}`)}
                        />
                    )
                })}
    

              <button type="button" onClick={() => removeAddress(addressIndex)}>
                Remove Address
              </button>
            </div>
          ))}
        </div>
      );

}


const AddressFormSchema = {
    'applicants': [
        {
            'address': [
                {'street': 'London' , 'city': '' , 'state': '' , 'zip': '' , 'country': 'London'},
                {'street': 'London' , 'city': '' , 'state': '' , 'zip': '' , 'country': 'London'}
            ]
        },
        {
            'address': [
                {'street': 'London1' , 'city': '' , 'state': '' , 'zip': '' , 'country': 'London1'}
            ]
        }
    ]
        
}


const MultForm = ({form}) => {
        const fieldArrayName = form.fieldArrayName;
        const newObject = {
            [fieldArrayName]: [form.fields.reduce((acc, field) => {
                if (field.subFields) {
                    const subObject = field.subFields.reduce((subAcc, current_value) => {
                            subAcc[current_value.name] = 'sdcsdv';
                            return subAcc;
                        }, {})

                    acc[field.name] = [subObject];

                }else{
                    acc[field.name] = '';
                    
                }
                return acc;
            }, {})]
          };
          

        const { register, handleSubmit, control, watch, formState: { errors } , setValue } = useForm({
            defaultValues: AddressFormSchema
            });

        const { fields: applicantFields, append: appendApplicant, remove: removeApplicant } = useFieldArray({
            control,
            name: fieldArrayName
          });
        

        const formMethods = {
            register,
            control,
            setValue,
            watch,
            handleSubmit
        }

        const onSubmit = (data) => {
            console.log('Multi Form Data' , data)
        }
        console.log('Applicant Fields' , applicantFields)   

        return (
            <>
            <form className='flex flex-col gap-y-3 w-full max-h-[100vh]  items-center justify-center overflow-y-auto bg-white/5 rounded-md py-3' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-2xl font-bold text-center'>{form.title}</h1>
                        <div className='space-y-5'>
                            {applicantFields.map((field, index) => {
                                console.log('Field', index, field);
                                return (
                                <div key={index}>
                                    {Object.keys(field).map((key, i) => {
                                    if (key !== 'id' && key != 'address_type') {
                                        return (
                                        <SubFieldForm 
                                            key={i}
                                            field={field} 
                                            formMethods={formMethods} 
                                            index={index} 
                                            fieldArrayName={fieldArrayName}
                                            schemaFields={form.fields[i]}
                                        />
                                        );
                                    } else {
                                        return null;
                                    }
                                    })}
                                    <button type="button" onClick={() => removeApplicant(index)}>
                                    Remove Applicant
                                    </button>
                                </div>
                                );
                            })}
                            </div>

                    <div className='my-2 space-y-3'>
                        <Button type='submit' className="bg-purple-400 text-white w-full max-w-52">Submit</Button>
                    
                        <Button type='button' 
                                onClick={() => {
                                    appendApplicant(newObject[fieldArrayName]);
                                }}
                                className="bg-purple-400 text-white w-full max-w-52">{form.appendButtonName}
                        </Button>
                    
                    </div>
            
            </form>
 
            </>
        );
}


export default MultForm;




// const Edit = ({fieldValues: {index, field} , formMethods: { control , watch } , arrayMethods:{update} , schemaFields , fieldArrayName } ) => {
//     const { register ,handleSubmit , setValue  } = useForm({
//       defaultValues: field 
//     });

//     const [formData , setFormData] = useState({})

//     const onSubmit = (data) => {
//         console.log(data)
//         console.log('formData' ,formData)
//         update(index, formData);
//       };
    

//     const data = useWatch({
//         control,
//         name: `${fieldArrayName}.${index}`
//       });
    
    
//     useEffect(() => {
//         console.log(fieldArrayName ,data)
//         setFormData(data)
//     }, [data])


    
  
//     return (
//       <div className='flex flex-col'>

//             {field && Object.keys(field).map((key , i) => {
            
//                 if (key !== 'id'){
//                 return (
//                         <Field key={key} 
//                             field={schemaFields[i]} 
//                             index={index}
//                             fieldArrayName={fieldArrayName}
//                             formMethods={{control , register , watch}}
//                         />
//                         )
//                 }
        
//                 })
//                 }           
        
//         <button
//           type="button"
//           className='bg-white rounded-lg text-black my-3'
//           onClick={handleSubmit(onSubmit)}
//         >
//           Update
//         </button>
//         <div className='divider bg-white h-0.5 w-full shadow-lg'></div>    
//       </div>
//     );
//   };



// const MultiForm = ({form}) => {
//     // extract the default values from the form
//       const defaultValues = form.fields.reduce((acc : Record<string , any>  , current_value) => {
//         acc[current_value.name] = '';
//         return acc;
//       }, {})

//       const fieldArrayName = form.fieldArrayName;


//       const { register, handleSubmit, control, watch, formState: { errors } , setValue } = useForm({
//         defaultValues: {
//             [fieldArrayName] : [
//             defaultValues
//             ]
//         }
//       });
    
//       const formMethods = {
//         register,
//         control,
//         setValue,
//         watch,
//         handleSubmit
//       }
//       const { fields, append, update, remove } = useFieldArray({
//         control,
//         name: fieldArrayName
//       });
//       const onSubmit = (data) => {
//         console.log(data)
//       }
    
//       return (
//         <form className='flex flex-col gap-y-3 w-full max-h-[100vh]  items-center justify-center overflow-y-auto bg-white/5 rounded-md py-3' onSubmit={handleSubmit(onSubmit)}>
//             <h1 className='text-2xl font-bold text-center'>{form.title}</h1>
//                 <div className='space-y-5'>
//                     {fields.map((field ,index) => {
//                         return <Edit key={field.id} 
//                                     fieldValues={{index, field}} 
//                                     formMethods={formMethods}
//                                     arrayMethods= {{ update }}
//                                     schemaFields={form.fields}
//                                     fieldArrayName={fieldArrayName}
//                                     />
                            
//                     })
                    
//                     }
               
//                 </div>

//                 <div className='my-2 space-y-3'>
//                     <Button type='submit' className="bg-purple-400 text-white w-full max-w-52">Submit</Button>
                
//                     <Button type='button' 
//                             onClick={() => {
//                                 append(defaultValues);
//                             }}
//                             className="bg-purple-400 text-white w-full max-w-52">{form.appendButtonName}</Button>
                  
//                   </div>
         
//         </form>
//       );
//     };

// export default MultiForm;