import React from 'react'


import MultiFormRender from './FormTypes/MultiForm/MultiFormRender.tsx';
import SingleFormRender from './FormTypes/SingleForm/SingleFormRender.tsx';
import { StyleProvider } from './StyleProvider.tsx';

export function  FormRender({ResponseSchema , AttributeSchema  , styles , formType , submitFunction}) {
  let form;

  switch(formType){
    case 'MultiForm':
      form = <MultiFormRender ResponseSchema={ResponseSchema} AttributeSchema={AttributeSchema} submitFunction={submitFunction} />
      break;
    case 'SingleForm':
      form = <SingleFormRender ResponseSchema={ResponseSchema} AttributeSchema={AttributeSchema} submitFunction={submitFunction} />
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
