import React from 'react'



import MultiFormRender from './FormTypes/MultiFormRender';
import { FieldData } from "@/types/InputTypes"
import AddressForm from './FormTypes/AddressForm';


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
  if (formType === 'AddressForm') {
    return <AddressForm field_data={field_data} submitFunction={submitFunction} />
  }

  return null;

}
