
import './App.css'
import { FormRender  , FieldType} from 'jsonformbuilder' ; 
 

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
      "name" : "firstName",
      "title": "First name",
      "description": "Enter your first name",
      type: FieldType.TEXT,
      isMandatory: true,
      

    },
    {
      "id" : 2,
      "name" : "lastName",
      "title": "Last name",
      "description": "Enter your first name",
      type: FieldType.TEXT,
      isMandatory: true,

    },
    {
      "id" : 3,
      "name" : "address",
      "title": "Address",
      "description": "Enter your Address",
      type: FieldType.ARRAY,
      isMandatory: true,
      subFields: [
        {
          "id" : 1,
          "name" : "postcode",
          "title": "postcode",
          "description": "Enter your postcode",
          type: FieldType.TEXT,
          isMandatory: true,
        },
        {
          "id" : 2,
          "name" : "Country",
          "title": "Country",
          "description": "Enter your Country",
          type: FieldType.TEXT,
          isMandatory: true,
        }
      ]
    },
    {
      "id" : 4,
      "name" : "Conditional address",
      "title": "Address",
      "description": "Enter your Address",
      type: FieldType.CARRAY,
      isMandatory: true,
      subFields: [
        {
          "id" : 1,
          "name" : "street",
          "title": "Street",
          "description": "Enter your Street",
          type: FieldType.TEXT,
          isMandatory: true,
        },
        {
          "id" : 2,
          "name" : "city",
          "title": "City",
          "description": "Enter your City",
          type: FieldType.TEXT,
          isMandatory: true,
        }
      ]
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
