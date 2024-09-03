import React from 'react'


import MultiFormRender from './FormTypes/MultiForm/MultiFormRender.tsx';
import SingleFormRender from './FormTypes/SingleForm/SingleFormRender.tsx';
import { DependantFieldProvider } from './lib/DependantFieldProvider.tsx';

export function  FormRender({field_data, formType , submitFunction}) {
  let form;

  switch(formType){
    case 'MultiForm':
      form = (
   
      <MultiFormRender field_data={field_data} submitFunction={submitFunction} />
       
      )
      break;
    case 'SingleForm':
      form = <SingleFormRender ResponseSchema={ResponseSchema} AttributeSchema={AttributeSchema} submitFunction={submitFunction} />
      break;
    default:
      console.log('No form type specified')
      form = null;
  }
 

  return (
    <DependantFieldProvider>
      {form}
    </DependantFieldProvider>
  )
}
