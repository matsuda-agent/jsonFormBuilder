import React , {useState, createContext, useContext, useEffect, useMemo} from 'react'
import clsx from 'clsx' 
import  Field  from '../../Fields/Field.jsx';
import { useForm , useFieldArray  ,  FormProvider , Controller } from 'react-hook-form';
// In the user's application

import { MdAddCircleOutline } from "react-icons/md";
import useDependantFieldStore from '../../store/useDependantFieldStore';


type FieldItem = {
  field_name: string;
  field_value: any; // Adjust the type of field_value based on your actual data type
};

type Field = {
  fields: FieldItem[];
};

type FieldData = {
  [key: string]: Field[];
};




export function  MultiFormRender({field_data , submitFunction}) {
    // extract tthe field array name and the fields from the schema
    const fieldArrayName = Object.keys(field_data)[0];

        // Iterate through each applicant and generate the response_schema for each
    const response_schema = field_data[fieldArrayName].map(applicant => {
      const applicantFields = {};
      applicant.fields.forEach(field => {
        applicantFields[field.field_name] = field.field_value;
      });
      return applicantFields;
    });

  const AttributeSchema = {};

  field_data[fieldArrayName].forEach(applicant => {
      applicant.fields.forEach(field => {
        AttributeSchema[field.field_name] = {
          type: field.field_type,
          title: field.title,
          description: field.description,
          is_required: field.is_required,
        };
      if (field.options) {
        AttributeSchema[field.field_name].options = field.options;
      }
      if (field.dependantOn) {
        AttributeSchema[field.field_name].dependantOn = field.dependantOn;
      }
      });
    });

    // Initialize useForm outside of useEffect and useState
    const formMethods = useForm({
      defaultValues: {
       [fieldArrayName] : response_schema
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

    const { removeDependantField } = useDependantFieldStore();



    const onSubmit = (data) => {
      console.log('Submitetd DAta', data)

      const tabularFormat = [];

      data[fieldArrayName].forEach((applicant , index) => {

        const applicantData = {};
        Object.entries(applicant).forEach(([key , value]) => {
          applicantData["applicant_id"] = index;
          applicantData["field_name"] = key;
          applicantData["field_value"] = value;
        });
        tabularFormat.push(applicantData);
      });
      // format the data so it matches sql schema 
      // id is the applicant id
      //  loan_application_id is the loan application id
      console.log('Tabular Format', tabularFormat);
      submitFunction(tabularFormat)
    }

    const handleRemove = (index) => {
      // Remove dependant fields related to the item being removed
      Object.keys(fields[index]).forEach(key => {
        removeDependantField(`${fieldArrayName}.${index}.${key}`);
      });
      remove(index);
    };



    return (
        <FormProvider {...methods} >
          <form  onSubmit={methods.handleSubmit(onSubmit)} className='Multi-Form'>
            <div className='ToolBar'>
                <button type='button' 
                        className='add-button'
                        onClick={() => append(response_schema)} 
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
                        <button className='remove-button' type='button' onClick={() => handleRemove(index)}>Remove</button>
                      </div>

                      <div className='FieldSet'>

                      {
                        Object.entries(field)
                          .filter(([key]) => key !== 'id')
                          .map(([key , value] , i) => {
                            return (
                              <Field key={i}  name={`${fieldArrayName}.${index}.${key}`}  
                              Attributes = {AttributeSchema[key]}
                              validations={field.validation_schema}
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




// {field_data && 
//   field_data[fieldArrayName].map((field , index) => {

//     return (      
//       <div className='Field-Section' key={index}>
//           <div className='Field-Section-header'>
//             <h1 className="h1">Applicant {index + 1}</h1>
//             <button className='remove-button' type='button' onClick={() => remove(index)}>Remove</button>
//           </div>

//           <div className='FieldSet'>

//         {field.fields && 
//           field.fields.map((field , i) => {
//             return (
//               <div key ={i}>
                // <Field  name={`${fieldArrayName}.${index}.${field.field_name}`}  
                //     Attributes = {
                //       {type: field.field_type,
                //       title: field.title,
                //       description: field.description,
                //       is_required: field.is_required
                //       }
                //     }
                //     validations={field.validation_schema}
                //     />
//               </div>
//             );
//           })
//         }
//           </div>

//       </div>
//     );
//   })
// }



// {
//   fields.map((field , index) => {
    
//     return (      
//       <div className='Field-Section' key={index}>
//           <div className='Field-Section-header'>
//             <h1 className="h1">Applicant {index + 1}</h1>
//             <button className='remove-button' type='button' onClick={() => remove(index)}>Remove</button>
//           </div>

//           <div className='FieldSet'>

        // {
        //   Object.entries(field)
        //     .filter(([key]) => key !== 'id')
        //     .map(([key , value] , i) => {

        //       // check if the field is dependant then don't render 
        //       if(AttributeSchema[`${fieldArrayName}.${key}`]?.dependantOn){
        //         return null;
        //       }

        //       return (
        //         <Field 
        //           name={`${fieldArrayName}.${index}.${key}`}  
        //           AttributesKey={{fieldArrayName , key}} 
        //           AttributeSchema={AttributeSchema}  
        //           key={`${value}${i}`} 
        //           ResponseSchema={ResponseSchema}  
        //           index={index}
        //           />
              
        //       );
        //     })
        // }
//           </div>

//       </div>
//     );
//   })
// }