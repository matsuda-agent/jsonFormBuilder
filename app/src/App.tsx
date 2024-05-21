
import './App.css'
import { FormRender  , FieldType , MultiFormRender} from 'json-styled-form-builder' ; 
// import schema 
import ResponseSchema  from './ApplicantDetailsResponseSchema.json';
import AttributeSchema  from './ApplicantDetailsAttributeSchema.json';
import { TabGroup , TabList , TabPanel  , TabPanels , Tab, Field} from '@headlessui/react'

// probably need to validate the schema before passing it to the form render or 
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
import clsx from 'clsx'




function App() {


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
      "form" : "flex flex-col p-10 m-5 items-center justify-center bg-white rounded-md",
      "heading" : "text-2xl font-bold font-serif",
      "button" : {
        "div" : "flex flex-row justify-between w-full p-3",
        "add" : "py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-400 flex flex-row justify-center items-center",
        "submit" : "p-3 bg-green-600 text-white rounded-md hover:bg-green-400",
        "remove": "py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-400"
      },

      "grid" : {
        "div" :  "grid grid-cols-2 gap-10 bg-white"
      },

      "main" : {
        "div" : "flex flex-col space-y-2 bg-white p-10 rounded-md"
      },
      "fieldGrid" : {
        "div" : "grid grid-cols-2 gap-10 bg-purple-300"
      },

   }
}

const className = 'bg-white flex flex-col rounded-lg p-3 w-full'
 // Define categories outside of any condition
 const categories =  {
  "Details":(
      <FormRender ResponseSchema={ResponseSchema} AttributeSchema={AttributeSchema} styles={styles} formType={'MultiForm'}/>
  )
  

};


  return (

    <div className='flex flex-col h-[100vh]'>
    <div> 
      <h1>Applicants</h1>

    </div>
    <div className='w-[80vw]'>
                <TabGroup as='div' defaultIndex={0} className='flex flex-col h-[100vh] w-[100vw] justify-end' >
                        <TabList className="flex flex-none flex-row space-x-1 bg-white w-full h-[5%] ">
                            {Object.keys(categories).map((category , i) => (
                            <Tab
                                key={i}
                                className={({ selected }) =>
                                classNames(
                                    'w-full py-2.5 text-sm font-medium leading-5 text-gray-700',
                                    'focus:outline-none',
                                    selected
                                    ? 'border-b-2 border-gray-300 bg-white'
                                    : 'hover:text-gray-400'
                    
                                )
                                }
                            >
                               {category}
                            </Tab>
                            ))}
                        </TabList>
                        <TabPanels as='div' className="bg-red-900 h-[95%] w-full ">
                            {Object.keys(categories).map((category, i) => (
                                <TabPanel key={i}  as='div' className= "bg-gray-800 h-[100%] flex flex-col items-center justify-center">

                                    <div className='flex flex-col bg-purple-500 items-center justify-center'>
                                      <ul className='grid '>
                                        <li>Applicant 1</li>
                                        <li>Applicant 2</li>
                                        <li>Applicant 3</li>
                                      </ul>
                                    </div>

                                    <div className='flex w-full overflow-y-auto justify-center items-center'>
                                      {categories[category]}
                                    </div>
                                    

                                </TabPanel>
                            ))}
                        </TabPanels>
                </TabGroup>     
        
    </div>
    </div>
  )
}

export default App
