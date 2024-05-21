import React, { useEffect } from 'react';
import { useFieldArray ,useFormContext } from 'react-hook-form';
import {Input , Legend , Label, Description , Fieldset} from '@headlessui/react'
import Field from  './Field.jsx';
import {useStyle} from '../StyleProvider.tsx';


const ArrayField = ({ name  , AttributesKey:{fieldArrayName , key}  , AttributeSchema , ResponseSchema })  => {
  const { title, description, type, isMandatory } = AttributeSchema[`${fieldArrayName}.${key}`];

  // form context 
  const { register, control, setValue, watch } = useFormContext();

  // define the field array
  const { fields, append, prepend, remove, swap, move, insert , update } = useFieldArray({
    control: control,
    name: name
  });

  // default fields
  const defaultFields = ResponseSchema[`${fieldArrayName}`][0][`${key}`][0];

  //styles
  const {styles} = useStyle();
  console.log('styles',styles);

  return (

    <Fieldset className={styles.arrayField.Fieldset}>
      <Legend className={styles.arrayField.Legend}>{title}</Legend>
        {
          fields.map((field, index) => {
            return Object.keys(field).map((k, i) => {
              const subkey = `${key}.${k}`;
              if (k!='id'){
              return (
                // <h1>
                //  {fieldArrayName}.{subkey}
                // </h1>
                <Field 
                  name={`${name}.${index}.${k}`}  
                  AttributesKey={{fieldArrayName , key : subkey}} 
                  AttributeSchema={AttributeSchema}  
                  key={i} 
                  ResponseSchema={ResponseSchema}
                />
              );
            }
            })
          })
        }
        <button type='button' 
        onClick={() => append(defaultFields)} 
        className="bg-purple-400 text-white w-full max-w-52">Add Address</button>
    </Fieldset>
  );

};
// SelectField.propTypes = SelectFieldAttributes; // Apply the predefined PropTypes
export default ArrayField;


          // <Field key={k}>
                //   <Label className="text-sm/6 font-medium text-white">{AttributeSchema[`${fieldArrayName}.${key}.${k}`].title}</Label>
                //   <Input className={clsx(
                //     'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                //     'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                //   )}
                //   {...register(`${name}.${index}.${k}`)} />
           
                // </Field>
                // <Field 
                //       name={`${fieldArrayName}[${index}].${key}`}  
                //       AttributesKey={{fieldArrayName , key}} 
                //       AttributeSchema={AttributeSchema}  
                //       key={key} 
                //       ResponseSchema={ResponseSchema}  
                // />
