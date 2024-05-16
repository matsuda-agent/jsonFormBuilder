import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FormRender } from 'jsonformbuilder';
import { Input , Button } from '@headlessui/react'


interface FormField{
  id: number;
  type: string;
  title: string;
}



interface FormSchema{
  title: string;
  type: string;
  required: string[];
  // fields list a list of dictionary
  fields: FormField[];

}

const FormSchema = {
  "title": "Personal Information",
  "type": "object",
  "required": ["firstName", "lastName"],
  "fields" : [
    {
      "id" : 1,
      "type": "text",
      "title": "First name"

    },
    {
      "id"  : 2,
      "type": "text",
      "title": "Last name"
    }
    ,{
      "id"  : 3,
      "type": "date",
      "title": "Date of Birth"
    }
  ]
};

function App() {


  return (
    <>
    <div className="flex items-center justify-center h-screen w-screen bg-gray-800 text-white">
      <FormRender schema={FormSchema} />
      {/* <SampleForm /> */} 
      {/* <Button className="bg-purple-400 w-[200px] h-[50px] text-black">Submit</Button> */}

     </div>
    </>
  )
}

export default App
