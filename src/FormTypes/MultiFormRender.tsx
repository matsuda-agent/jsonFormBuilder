import React from 'react'
import  Field  from '../Fields/Field';
import { useForm , useFieldArray  , SubmitHandler , FormProvider  } from 'react-hook-form';
import { FieldRow, FieldData, MultiFormRenderProps, FormField } from "@/types/InputTypes"
import {Button} from '../UI/Button'



interface Applicant {
  app_id: string;
  fields: FormField[];
}


export function  MultiFormRender({field_data , submitFunction} : MultiFormRenderProps) {
    // extract tthe field array name and the fields from the schema

    const transformData = (data: FieldRow[]): { [key: string]: any } => {
      const groupedData = data.reduce<{ [key: string]: FormField[] }>((acc :{ [key: string]: any }, item:FieldRow) => {
        const { applicant_loan_application_id , ...field } = item;
        if (applicant_loan_application_id) { // Type guard to ensure it's defined
          if (!acc[applicant_loan_application_id]) {
            acc[applicant_loan_application_id] = [];
          }
          acc[applicant_loan_application_id].push(field);
        } else {
          console.error('applicant_loan_application_id is undefined for field:', field);
        }
        return acc;
      }, {});
      return groupedData;
    };

    const transformedData = transformData(field_data);

    const defaultValues = Object.keys(transformedData).map((id) => ({
      app_id: id,
      fields: transformedData[id].reduce((acc: { [key: string]: any }, field: FormField) => {
          acc[field.field_name] = field.field_value;
        return acc;
      }, {}),
    }));

    const methods = useForm({
      defaultValues: {
        applicants: defaultValues
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
            <div className='Field-Grid'>
             
             {
              fields.map((field , index) => {
                return (      
                  <div className='Field-Section' key={index}>
                      <div className='hidden'>
                          <input 
                            className='px-2 hidden'
                            {...methods.register(`applicants.${index}.app_id`)}
                            disabled
                            />
                      </div>

                      <div className='FieldSet'>
                        {
                          transformedData[field.app_id].map((field:FormField , i:number) => {
                            return (
                                <Field 
                                    key={i}
                                    name={`applicants.${index}.fields.${field.field_name}`}  
                                    Attributes = {
                                      {type: field.field_type,
                                      title: field.title,
                                      description: field.description,
                                      is_required: field.is_required,
                                      disabled: field.disabled,
                                      options: field?.options,
                                      dependant_on: field?.dependant_on
                                      }
                                    }
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


             <div className='mt-10 w-[200px]'>
              <Button type='submit' className='min-w-[200px]'>
                Submit
              </Button>
            </div>
                  
      
          </form>
        </FormProvider>
    )
  }
  
export default MultiFormRender;
