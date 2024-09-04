// import React , {useState , useEffect, useMemo} from 'react'
// import clsx from 'clsx' 
// import  Field  from '../../Fields/Field.js';
// import { useForm , useFieldArray, Controller , useWatch ,  FormProvider, useFormContext } from 'react-hook-form';
// // In the user's application

// import { MdAddCircleOutline } from "react-icons/md";


// export function  SingleFormRender({ResponseSchema , AttributeSchema  , submitFunction}) {
//     // extract tthe field array name and the fields from the schema
//     console.log('SingleFormRender', ResponseSchema)
//     const fieldArrayName = Object.keys(ResponseSchema)[0];
//     const defaultFields = ResponseSchema[fieldArrayName];

//     console.log('SingleFormRender defaultValues', defaultFields)

//     // Initialize useForm outside of useEffect and useState
//     const formMethods = useForm({
//       defaultValues: defaultFields,
//       shouldUnregister : true,
//         criteriaMode: "all"
//     });
//     // Initialize state with formMethods
//     const [methods, setMethods] = useState(formMethods);
    

//     const onSubmit = (data) => {
//       const newData ={
//       [fieldArrayName]:data
//       }

//       console.log('SingleFormData', newData)
//       submitFunction(newData)
//     }




//     return (
//         <FormProvider {...methods} >
//           <form  onSubmit={methods.handleSubmit(onSubmit)} className='Single-Form'>
//             <div className='ToolBar'>
//                 <button type='submit'  
//                         className='submit-button'
//                         >Submit</button>
//             </div>
//             <div className='FieldSet'> 

//                     {
//                       Object.entries(defaultFields)
//                         .filter(([key]) => key !== 'id')
//                         .map(([key , value] , i) => {

//                           // check if the field is dependant then don't render 
//                           if(AttributeSchema[`${fieldArrayName}.${key}`]?.dependantOn){
//                             return null;
//                           }
//                           return (
//                             <Field 
//                               name={`${key}`}  
//                               AttributesKey={{fieldArrayName , key}} 
//                               AttributeSchema={AttributeSchema}  
//                               key={`${value}${i}`} 
//                               ResponseSchema={ResponseSchema}  
//                               />
                          
//                           );
//                         })
//                     }
//             </div>
//           </form>
//         </FormProvider>
//     )
//   }
  
// export default SingleFormRender;