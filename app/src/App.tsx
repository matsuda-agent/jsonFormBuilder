import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SampleForm } from 'jsonformbuilder';




const FormSchema = {
  "title": "Personal Information",
  "type": "object",
  "required": ["firstName", "lastName"],
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First name"
      
    },
    "lastName": {
      "type": "string",
      "title": "Last name"
    }
  }
};
function App() {


  return (
    <>
    <SampleForm />
     
    </>
  )
}

export default App
