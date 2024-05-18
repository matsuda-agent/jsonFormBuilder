
import './App.css'
import { FormRender  , FieldType , MultiFormRender} from 'jsonformbuilder' ; 
// import schema 
import RespsoneSchema  from './ApplicantResponseSchema.json';
import AttributeSchema  from './ApplicantAttributeSchema.json';

// probably need to validate the schema before passing it to the form render or 

function App() {


  return (
    <>
    <div className="flex items-center justify-center h-screen w-screen bg-gray-800 text-white">
        <MultiFormRender RespsoneSchema={RespsoneSchema} AttributeSchema={AttributeSchema} />
     </div>
    </>
  )
}

export default App
