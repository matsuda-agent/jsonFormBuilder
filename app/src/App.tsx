


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



    const applianct_details_data =
{"applicant_peronsal_details" :
    [ 
      {
         "applicant_id" : '1',
         "loan_application_id" : '1',
          "fields" : [
        { 
         "id" : '1'
         , "field_name" : 'first_name'
         , "field_value" : ''
         , "field_type" : 'text'
         , "title" : 'First Name'
         , "description" : 'Enter your first name'
         , "is_required" : true
         , "validation_schema" : {
            minLength: {
            value: 3,
            message: 'Minimum length is 3'
            }
         }
        , "field_type_id" : "1"
       } , 
       { 
         "id" : '2'
         , "field_name" : 'last_name'
         , "field_value" : ''
         , "field_type" : 'text'
         , "title" : 'Last Name'
         , "description" : 'Enter your last name'
         , "is_required" : true
         , "validation_schema" : {}
           , "field_type_id" : "2"
       } , {
         "id" : '3'
         ,  "field_name" : 'marital_status'
         , "field_value" : ''
         , "field_type" : 'select'
         , "title" : 'Marital Status'
         , "description" : 'Select your marital status'
         , "is_required" : true
         , "validation_schema" : {}
         , "field_type_id" : "3"
         , "options" : [
           {"value" : "single" , "label" : "Single"}
           , {"value" : "married" , "label" : "Married"}
           , {"value" : "divorced" , "label" : "Divorced"}
         ]
       } , 
       { 
         "id" : '4'
         ,"field_name" : "has_dependants"
         , "field_value" : ''
         , "field_type" : 'radio'
         , "title" : 'Has Dependants'
         , "description" : 'Select if you have dependants'
         , "is_required" : true
         , "validation_schema" : {}
         , "field_type_id" : "4"
       }, {
         "id" : '5'
         , "field_name" : 'dependants_count'
         , "field_value" : ''
         , "field_type" : 'number'
         , "title" : 'Dependants Count'
         , "description" : 'Enter the number of dependants'
         , "is_required" : true
         , "validation_schema" : {}
         , "dependantOn" : 'has_dependants'
       }
       ]} ,
      {
         "applicant_id" : '2',
          "fields" : [
        { 
         "id" : '1'
         , "field_name" : 'first_name'
         , "field_value" : ''
         , "field_type" : 'text'
         , "title" : 'First Name'
         , "description" : 'Enter your first name'
         , "is_required" : true
         , "validation_schema" : {}
        , "field_type_id" : "1"
       } , 
       { 
         "id" : '2'
         , "field_name" : 'last_name'
         , "field_value" : ''
         , "field_type" : 'text'
         , "title" : 'Last Name'
         , "description" : 'Enter your last name'
         , "is_required" : true
         , "validation_schema" : {}
           , "field_type_id" : "2"
       } , {
         "id" : '3'
         ,  "field_name" : 'marital_status'
         , "field_value" : ''
         , "field_type" : 'select'
         , "title" : ''
         , "description" : 'Select your marital status'
         , "is_required" : true
         , "validation_schema" : {}
         , "field_type_id" : "3"
         , "options" : [
           {"value" : 'single' , "label" : 'Single'}
           , {"value" : 'married' , "label" : 'Married'}
           , {"value" : 'divorced' , "label" : 'Divorced'}
         ]
       } , 
       { 
         "id" : '4'
         ,"field_name" : "has_dependants"
         , "field_value" : ''
         , "field_type" : 'cradio'
         , "title" : 'Do you have any dependants'
         , "description" : 'Select if you have dependants'
         , "is_required" : true
         , "validation_schema" : {}
         , "field_type_id" : "4"
         , "options" : [
            {"value" : 'yes' , "label" : 'Yes'}
            , {"value" : 'no' , "label" : 'No'}
          ]
       }, {
         "id" : '5'
         , "field_name" : 'dependants_count'
         , "field_value" : ''
         , "field_type" : 'number'
         , "title" : 'Dependants Count'
         , "description" : 'Enter the number of dependants'
         , "is_required" : true
         , "validation_schema" : {}
         , "dependantOn" : {
            "field_name" : 'has_dependants',
            "field_value" : 'yes'
         }
       }
       ]} ,
     ]
    }
  const Submitfunc = (data ,key) => {  
    console.log('Data Submitted' , key);
    console.log('Submitfunc',data);

    // setSchemaFiles(prev => ({...prev, 
    //   [key] : {
    //     "attribute"  : schemaFiles[key].attribute,
    //     "response" : data 
    //   }
    // })
    // )
    
  }






  return (
    <div className='flex flex-row w-full h-[100vh] overflow-y-scroll space-x-4 bg-gray-100 p-5'>

      <ol className="space-y-4 w-3/12 py-10 px-3 bg-white h-full rounded-3xl">

        <VerticalStep index={1} mainName={'Applicant'} secondName={'Details'} setFormIndex={setFormIndex} currentIndex={formIndex} isCompleted={true} />
        <VerticalStep index={2} mainName={'Applicant'} secondName={'Address'}  setFormIndex={setFormIndex} currentIndex={formIndex}  isCompleted={false} />
   </ol>


      <div className='flex flex-col w-9/12 items-center h-full bg-inherit rounded-3xl'>    
        <FormRender 
            key={1}
            field_data = {applianct_details_data}
            submitFunction = {(data) => Submitfunc(data , 1)}
            formType={"MultiForm"} 
          />
    
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
