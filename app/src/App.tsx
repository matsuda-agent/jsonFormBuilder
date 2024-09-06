import './App.css'
import { FormRender } from 'json-styled-form-builder' ; 
import React,{ useState, useEffect }  from 'react';
import './style.css'
import { useForm , useFieldArray  ,  FormProvider , Controller } from 'react-hook-form';
import { createClient } from '@supabase/supabase-js'


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


export const supabase = createClient(supabaseUrl
                                , supabaseAnonKey
                            , { auth : {storage : localStorage , storageKey:'s1'}}
);


export default function App() {

  const [formIndex , setFormIndex] = useState(2);

    
 

  const [applicant_details, setApplicantDetails] = useState({});
  const [address_details, setAddressDetails] = useState();


  useEffect(() => {
    const fetchApplicantDetails = async () => { 
      const { data, error } = await supabase
        .from('applicant_details')
        .select('*')
        .eq('applicant_loan_application_id', 52)
        .eq('form_name', "Applicants Information")
        .order('field_order', { ascending: true })
        return data;
    }

    fetchApplicantDetails().then((data) => {  
      console.log('data', data)
      setApplicantDetails(data);
    }
    )

    const fetchAddressDetails = async () => { 
      const { data, error } = await supabase
        .from('applicant_details')
        .select('* , array_fields(*)')
        .eq('applicant_loan_application_id', 52)
        .eq('form_name', 'Applicant Address')
        .order('field_order', { referencedTable: 'array_fields', ascending: true});


        const formattedData = data[0].array_fields.map((item) => {
          return {
            ...item,
            options: item.options ?  (item.options.options ? item.options.options : item.options )  : null,
          }

        })
        console.log('Formatted  Addrress Data' , formattedData);

        return formattedData;
    }
  
    fetchAddressDetails().then((data) => {
      console.log('data', data)
      setAddressDetails(data);
    })
  },[])




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


  if (!applicant_details || !address_details) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-row w-[100vw] h-[100vh] p-5">

      <div className='h-full w-[20%] flex  flex-col items-center justify-center space-y-2'>
         <div className='bg-blue-100 border p-4 w-full rounded-lg hover:bg-slate-50 cursor-pointer'
            onClick={() => setFormIndex(1)}>

            <h1> Applicant Details </h1>
          </div>

          <div className='bg-blue-100 border p-4 w-full rounded-lg hover:bg-slate-50 cursor-pointer'
            onClick={() => setFormIndex(2)}>

            <h1> Address Details </h1>
          </div>
      </div>


      <div className='flex flex-col w-[70%] antialiased items-center h-full bg-inherit rounded-3xl'>    
       {formIndex == 1 ? 
        <FormRender 
            key={1}
            field_data = {applicant_details}
            submitFunction = {(data) => Submitfunc(data , 1)}
            formType={"MultiForm"} 
          />
          : null
       }

      {formIndex == 2 ? 
        <FormRender 
            key={1}
            field_data = {address_details}
            submitFunction = {(data) => Submitfunc(data , 1)}
            formType={"AddressForm"} 
          />
          : null
       }
      </div>  


    </div>

  )

}




// <ol className="space-y-4 w-3/12 py-10 px-3 bg-white h-full rounded-3xl">

// <VerticalStep index={1} mainName={'Applicant'} secondName={'Details'} setFormIndex={setFormIndex} currentIndex={formIndex} isCompleted={true} />
// <VerticalStep index={2} mainName={'Applicant'} secondName={'Address'}  setFormIndex={setFormIndex} currentIndex={formIndex}  isCompleted={false} />
// </ol>



const VerticalStep = ({index , mainName , secondName ,currentIndex, isFinal , isCompleted , setFormIndex}) => {
  const click = () => {
      setFormIndex(index);
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

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
