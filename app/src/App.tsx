
import './App.css'
import { FormRender  , FieldType} from 'jsonformbuilder' ; 
// import schema 
import schema  from './FormSchema.json';

// probably need to validate the schema before passing it to the form render or 

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-800 text-white overflow-y-auto">
      <div className="w-full  p-8"> {/* This container limits the form width and adds padding */}
        <FormRender schema={schema} />
      </div>
    </div>
  );
}

export default App;
