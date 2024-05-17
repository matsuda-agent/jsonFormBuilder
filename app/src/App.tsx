
import './App.css'
import { FormRender  , FieldType} from 'jsonformbuilder' ; 
// import schema 
import schema  from './FormSchema.json';

// probably need to validate the schema before passing it to the form render or 

function App() {


  return (
    <>
    <div className="flex items-center justify-center h-screen w-screen bg-gray-800 text-white">
      <FormRender schema={schema} />
      {/* <SampleForm /> */} 
      {/* <Button className="bg-purple-400 w-[200px] h-[50px] text-black">Submit</Button> */}

     </div>
    </>
  )
}

export default App
