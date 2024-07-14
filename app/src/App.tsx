


import './App.css'
import { FormRender  , FieldType , MultiFormRender} from 'json-styled-form-builder' ; 

import React,{ useState, useEffect }  from 'react';

// import schema 
import ResponseSchema  from './TestSchemas/ApplicantResponseSchema.json';
import AttributeSchema  from './TestSchemas/ApplicantAttributeSchema.json';

import AddressAttributeSchema  from './TestSchemas/ApplicantAddressAttributeSchema.json';
import AddressResponseSchema  from './TestSchemas/ApplicantAddressResponseSchema.json';

import PropertyDetailsAttributeSchema  from './TestSchemas/PropertyDetailsAttributeSchema.json';
import PropertyDetailsResponseSchema  from './TestSchemas/PropertyDetailsResponseSchema.json';

import CreditHistoryDetailsAttributeSchema  from './TestSchemas/CreditHistoryDetailsAttributeSchema.json';
import CreditHistoryDetailsResponseSchema  from './TestSchemas/CreditHistoryDetailsResponseSchema.json';



import './style.css'
   
   




const ChosenFormType = {
  1: 'MultiForm',
  2: 'MultiForm',
  3: 'SingleForm',
  4: 'MultiForm',
  default: 'MultiForm'
}

export default function App() {

  const [formIndex , setFormIndex] = useState(1);

  const [schemaFiles, setSchemaFiles]  = useState({
      "applicant"  :{
        "response" : ResponseSchema,
        "attribute" : AttributeSchema
      }
      ,"address" : {
        "response" :AddressResponseSchema,
        "attribute" : AddressAttributeSchema
      } ,"property" : {
        "response" :PropertyDetailsResponseSchema,
        "attribute" : PropertyDetailsAttributeSchema
      },"credithistory" : {
        "response" :CreditHistoryDetailsResponseSchema,
        "attribute" : CreditHistoryDetailsAttributeSchema
      }
    })


  const Submitfunc = (data ,key) => {  
    console.log('Data Submitted' , key);
    console.log(data);
    setSchemaFiles(prev => ({...prev, 
      [key] : {
        "attribute"  : schemaFiles[key].attribute,
        "response" : data 
      }
    })
    )
    
  }


  return (
    <div className='flex flex-row w-full h-[100vh] overflow-y-scroll space-x-4 bg-gray-100 p-5'>

      <ol className="space-y-4 w-3/12 py-10 px-3 bg-white h-full rounded-3xl">

        <VerticalStep index={1} mainName={'Applicant'} secondName={'Details'} setFormIndex={setFormIndex} currentIndex={formIndex} isCompleted={true} />
        <VerticalStep index={2} mainName={'Applicant'} secondName={'Address'}  setFormIndex={setFormIndex} currentIndex={formIndex}  isCompleted={false} />
        <VerticalStep index={3} mainName={'Property'} secondName={'Details'} setFormIndex={setFormIndex}  currentIndex={formIndex}  isCompleted={false} />
        <VerticalStep index={4} mainName={'Credit History'} secondName={'Details'} setFormIndex={setFormIndex}  currentIndex={formIndex}  isCompleted={false} />
     </ol>


      <div className='flex flex-col w-9/12 h-full bg-inherit rounded-3xl'>      
            {Object.entries(schemaFiles).map(([key , value] , index) => {
              return (
                <div key={index} className={formIndex === index + 1 ? `visible` : 'hidden'}>
                  <FormRender 
                    key={index}
                    ResponseSchema={value.response} 
                    AttributeSchema={value.attribute} 
                    submitFunction = {(data) => Submitfunc(data , key)}
                    formType={ChosenFormType[index + 1] || ChosenFormType.default} 
                  />
                </div>
              );

            }
          )}

      </div>

    </div>
  )

}






const VerticalStep = ({index , mainName , secondName ,currentIndex, isFinal , isCompleted , setFormIndex}) => {
  const click = () => {
      setFormIndex(index);
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
