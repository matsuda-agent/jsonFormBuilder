import React from 'react'
import  Field  from '../../Fields/Field';
import { useForm , useFieldArray  , SubmitHandler , FormProvider  } from 'react-hook-form';


interface Field {
  applicant_loan_application_id: string;
  field_name: string;
  field_value: any; // Replace 'any' with the actual type if known
  field_type: string;
  title: string;
  description: string;
  is_required: boolean;
  options?: any; // Replace 'any' with the actual type if known
  dependantOn?: any; // Replace 'any' with the actual type if known
  validation_schema?: any; // Replace 'any' with the actual type if known
}

type FieldData = Field[];

interface MultiFormRenderProps {
  field_data: FieldData
  submitFunction: (data: any) => void; // Replace 'any' with the actual type if known
}



interface FormField {
  field_name: string;
  field_value: any; // Replace 'any' with the actual type if known
  field_type: string;
  title: string;
  description: string;
  is_required: boolean;
  options?: any; // Replace 'any' with the actual type if known
  dependantOn?: any; // Replace 'any' with the actual type if known
  validation_schema?: any; // Replace 'any' with the actual type if known
}


interface Applicant {
  app_id: string;
  fields: FormField[];
}


export function  MultiFormRender({field_data , submitFunction} : MultiFormRenderProps) {
    // extract tthe field array name and the fields from the schema
    const transformData = (data: Field[]): { [key: string]: any } => {
      const groupedData = data.reduce<{ [key: string]: FormField[] }>((acc :{ [key: string]: any }, item:Field) => {
        const { applicant_loan_application_id, ...field } = item;
        if (!acc[applicant_loan_application_id]) {
          acc[applicant_loan_application_id] = [];
        }
        acc[applicant_loan_application_id].push(field);
        return acc;
      }, {});
      return groupedData;
    };


    const transformedData = transformData(field_data );
    const methods = useForm({
      defaultValues: {
        applicants: Object.keys(transformedData).map((id) => ({
          app_id: id,
          fields: transformedData[id].reduce((acc:{[key:string]: string} , field:FormField) => {
            acc[field.field_name] = field.field_value;
            return acc;
          }, {}),
        })),
      },
      shouldUnregister: true,
       criteriaMode: "all"
    } 
  );
  
    const { fields } = useFieldArray({
      control: methods.control,
      name: 'applicants',
    });
  

    const onSubmit: SubmitHandler<{ applicants: { app_id: string; fields: any; }[] }> = (data) => {
      const formattedData: FieldData = [];
  
      data.applicants.forEach((applicant:Applicant) => {
        const { app_id, fields } = applicant;

        Object.entries(fields).forEach(([field_name, field_value]) => {
          const fieldMeta = transformedData[app_id].find((field:FormField) => field.field_name === field_name);
          formattedData.push({
            ...fieldMeta,
            field_value,
            applicant_loan_application_id: app_id,
          });
        });
      });
  
      submitFunction(formattedData);
    };


    return (
        <FormProvider {...methods} >
          <form  onSubmit={methods.handleSubmit(onSubmit)} className='Multi-Form'>
            <div className='ToolBar'>

                <button type='submit'   className='submit-button'
                        >Submit</button>
            </div>
            <div className='Field-Grid'>
             
             {
              fields.map((field , index) => {
                return (      
                  <div className='Field-Section' key={index}>
                      <div className='Field-Section-header'>
                        <h1 className="h1">Applicant  
                          <input 
                            className='px-2 hidden'
                            {...methods.register(`applicants.${index}.app_id`)}
                            disabled
                            />

                        </h1>
                      </div>

                      <div className='FieldSet'>
                        {
                          transformedData[field.app_id].map((field:FormField , i:number) => {
                            return (
                              <div key ={i}>
                                <Field  name={`applicants.${index}.fields.${field.field_name}`}  
                                    Attributes = {
                                      {type: field.field_type,
                                      title: field.title,
                                      description: field.description,
                                      is_required: field.is_required,
                                      options: field?.options,
                                      dependantOn: field?.dependantOn
                                      }
                                    }
                                    validations={field.validation_schema}
                                    />
                              </div>
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