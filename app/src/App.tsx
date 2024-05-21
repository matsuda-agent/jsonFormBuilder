
import './App.css'
import { FormRender  , FieldType , MultiFormRender} from 'json-styled-form-builder' ; 
// import schema 
import ResponseSchema  from './TestSchemas/ApplicantResponseSchema.json';
import AttributeSchema  from './TestSchemas/ApplicantAttributeSchema.json';

import AddressAttributeSchema  from './TestSchemas/ApplicantAddressAttributeSchema.json';
import AddressResponseSchema  from './TestSchemas/ApplicantAddressResponseSchema.json';

import React from 'react';



const styles= {
  'text' : 'border border-gray-300 rounded-md w-full p-2',
  "inputField" : {
    "label" : "text-sm font-medium text-gray-700 font-serif",
    "Input": "border-b-2 hover:border-dashed hover:border-blue-400 border-gray-300 rounded-none w-full p-2",
  },
  "phoneField" :{
    "label" : "text-sm font-medium text-gray-700",
    "PhoneInput" :  {
      width: '100%',
      padding: '0.375rem 0.75rem',
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.5',
      color: '#495057',
      backgroundColor: 'white',
      backgroundClip: 'padding-box',
      borderBottom: '1px solid #ced4da',
      transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
      '&:focus': {
        color: '#495057',
        backgroundColor: '#fff',
        borderColor: '#80bdff',
        outline: 0,
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    }
  },
  "selectField" : {
    "label" : "text-sm font-medium text-gray-700 font-serif",
    "selectField" : 'border-b border-gray-300 rounded-none w-full p-2 appearance-none',
    "icon" : "group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black"
  },
  "form" : {
    "form" : "flex flex-col p-4 m-1 items-center bg-white h-full rounded-3xl",
    "heading" : "text-2xl font-bold font-serif",
    "button" : {
      "div" : "flex flex-row justify-between w-full p-3",
      "add" : "py-2 px-5 bg-gray-600 text-white rounded-md hover:bg-blue-600 flex flex-row justify-center items-center",
      "submit" : "py-2 px-5 bg-blue-600 text-white rounded-md hover:bg-green-400",
      "remove": "py-2 px-5 bg-red-600 text-white rounded-md hover:bg-red-400"
    },

    "grid" : {
      "div" :  "grid grid-cols-2 w-full gap-5 bg-inherit rounded-md  overflow-y-scroll"
    },

    "main" : {
      "div" : "flex flex-col space-y-2 bg-white border-2 p-5 rounded-md"
    }
    ,"fieldGrid" : {
      "div" : "grid grid-cols-1 gap-4 bg-white p-3 rounded-md"
    }
  },

  "arrayField" : {
        "Fieldset" : "rounded-none  bg-white ",
        "Legend" : "font-semibold text-black",
        "AppendButton" : "bg-purple-400 hover:bg-purple-600 py-2 px-4 rounded-lg text-white w-full mt-4",
        "Div" : "space-y-4"
    }

 }



function App() {

  const [formIndex , setFormIndex] = React.useState(1);
  const Forms = {
    // 1 : <FormRender ResponseSchema={ResponseSchema} AttributeSchema={AttributeSchema} styles={styles} formType={'MultiForm'}/>,
    1 : <FormRender ResponseSchema={AddressResponseSchema} AttributeSchema={AddressAttributeSchema} styles={styles} formType={'MultiForm'}/>,
    2 : null
  }



  return (
    <div className='flex flex-row w-full h-[100vh] overflow-y-scroll space-x-4 bg-gray-100 p-5'>

      <ol className="space-y-4 w-3/12 py-10 px-3 bg-white h-full rounded-3xl">

        <VerticalStep index={1} mainName={'Applicant'} secondName={'Details'} setFormIndex={setFormIndex} currentIndex={formIndex} isCompleted={true} />
        <VerticalStep index={2} mainName={'Applicant'} secondName={'Address'}  setFormIndex={setFormIndex} currentIndex={formIndex}  isCompleted={false} />
        <VerticalStep index={3} mainName={'Employment'} secondName={'Details'} setFormIndex={setFormIndex}  currentIndex={formIndex}  isCompleted={false} />
        <VerticalStep index={4} mainName={'Current Mortgage'} secondName={'Details'} setFormIndex={setFormIndex} currentIndex={formIndex}  isCompleted={false} />
        <VerticalStep index={5} mainName={'Credit'} secondName={'History'}  setFormIndex={setFormIndex} currentIndex={formIndex}  isCompleted={false} />
        <VerticalStep index={6} mainName={'Existing Property'} secondName={'Details'} currentIndex={formIndex}  isCompleted={false} />
        <VerticalStep index={7} mainName={'Property'} secondName={'Details'} setFormIndex={setFormIndex} currentIndex={formIndex}  isCompleted={false}  isFinal={true}/>
      </ol>


      <div className='flex flex-col w-9/12 h-full bg-inherit rounded-3xl'> 
        <h1 className='text-2xl font-bold font-sans mb-3 pb-3 border-b-4 border-blue-500 w-[200px]'>Applicant Details</h1>
        {Forms[formIndex]}
      </div>

    </div>
  )

}

export default App;




const VerticalStep = ({index , mainName , secondName ,currentIndex, isFinal , isCompleted , setFormIndex}) => {
  const click = () => {
    setFormIndex(index) 
  }

  const current= 'text-blue-700 bg-blue-100 border-blue-300 ';
  const done = 'text-green-700 bg-green-100 border-green-300';

  function RightIcon() {
    if (currentIndex == index) {
      return (
        <svg className="rtl:rotate-180 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>

      );
    }
    if (isCompleted) {
      return (
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
        </svg>
      );
    }
  }

    return (
      <li>
        <div onClick={click}
          className={`w-full p-4  border ${currentIndex === index ? (current) : (
          isCompleted ? (done) : 'border-gray-300 bg-gray-100')}               
               rounded-lg cursor-pointer`} role="alert">
          <div className="flex flex-row justify-between items-center">
            <span className="sr-only">{mainName} {secondName}</span>
            <h3 className="font-medium font-sans text-md">{`${index}. ${mainName} ${secondName}`}</h3>
            <RightIcon />

          </div>

        </div>
      </li>
    );

  }
