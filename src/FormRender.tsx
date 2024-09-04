import React from 'react'



import MultiFormRender from './FormTypes/MultiForm/MultiFormRender';


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

interface FormRenderProps {
  field_data:FieldData
  formType: string;
  submitFunction: (data: any) => void; // Replace 'any' with the actual type if known
}

export function FormRender({ field_data, formType, submitFunction }: FormRenderProps): JSX.Element | null {
  // let form;

  // switch(formType){
  //   case 'MultiForm':
  //     form = <MultiFormRender field_data={field_data} submitFunction={submitFunction} />
       
  //     break;
  //   case 'SingleForm':
  //     form = <SingleFormRender ResponseSchema={ResponseSchema} AttributeSchema={AttributeSchema} submitFunction={submitFunction} />
  //     break;
  //   default:
  //     console.log('No form type specified')
  //     form = null;
  // }


  if (formType === 'MultiForm') {
    return   <MultiFormRender field_data={field_data} submitFunction={submitFunction} />
  }

  return null;

}
