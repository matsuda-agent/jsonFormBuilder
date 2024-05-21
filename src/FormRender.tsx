import React from 'react'


import MultiFormRender from './FormTypes/MultiForm/MultiFormRender.tsx';
import Form from './FormTypes/Form.tsx';
import { StyleProvider } from './StyleProvider.tsx';

export function  FormRender({ResponseSchema , AttributeSchema  , styles , formType}) {
  console.log('FormRender:', formType)
  let form;
  switch(formType){
    case 'MultiForm':
      form = <MultiFormRender ResponseSchema={ResponseSchema} AttributeSchema={AttributeSchema} />
      break;
    case 'Form':
      form = <Form ResponseSchema={ResponseSchema} AttributeSchema={AttributeSchema} />
      break;
    default:
      console.log('No form type specified')
      form = null;
  }
 

  return (
    <StyleProvider styles={styles}>
      {form}
    </StyleProvider>
  )
}
