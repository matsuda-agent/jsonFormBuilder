import React, { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import { SelectFieldAttributes } from './FieldAttributes'; // Adjust the path as necessary
import {Input , Field , Legend , Label, Description , Fieldset} from '@headlessui/react'
import clsx from 'clsx';


function compileCondition(condition) {
  // recursive function to go through the conditions and join the them into a singe string 
  if (condition.and) {
    return condition.and.map(compileCondition).filter(Boolean).join(' && ');
  } else if (condition.property) {
    if (condition.notNull) {
      return `${condition.property}`;
    } else if (condition.greaterThan) {
      return `${condition.property} > ${condition.greaterThan}`;
    } else if (condition.equals) {
      return `${condition.property} === '${condition.equals}'`;
    }
  }
  return null
}

function compileAction(action) {
  return action;
}

function compile(json) {
  const obj = JSON.parse(json);
  const condition = compileCondition(obj.condition);
  const action = compileAction(obj.action);
  console.log(condition);
  return new Function('watchFields', 'FieldValues', 'append', `if (${condition}) { ${action} }`);
}


const CArrayField = ({ field :{id  , name, title , type, isMandatory , description , subFields} 
                      , formMethods: {register , control ,setValue ,watch}}) => {

  const { fields, append, prepend, remove, swap, move, insert , update } = useFieldArray({
    control: control,
    name: name
  });

  // extract the subfields name form the subfileds 
  const FieldValues = subFields.reduce((acc, current_value) => {
                                    acc[current_value.name] = '';
                                    return acc;
                                      },{});

  useEffect(() => {
    if(fields.length === 0){
        update(0,FieldValues);
      }
  },[])
  const watchFields = watch(name);
  const json = `{
  "condition": {
    "and": [
      {
        "property": "watchFields",
        "notNull": true
      },
      {
        "property": "watchFields.length",
        "greaterThan": 0
      },
      {
        "property": "watchFields[watchFields.length-1].city",
        "equals": "a"
      }
    ]
  },
  "action": "append(FieldValues)"
}`;

  const compiledFunction = compile(json);

  useEffect(() => {
    compiledFunction(watchFields, FieldValues, append)
  }, [watchFields?.[watchFields.length-1].city]);


  return (

    <Fieldset className="space-y-3 rounded-xl bg-white/5 p-6 sm:p-10">
      <Legend className="text-base/7 font-semibold text-white">{title}</Legend>
        {
          fields.map((field, index) => {
            return Object.keys(field).map((key) => {
              if (key!='id'){
              return (
                
                <Field key={key}>
                  <Label className="text-sm/6 font-medium text-white">{key}</Label>
                  <Input className={clsx(
                    'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                  )}
                  {...register(`${name}.${index}.${key}`)} />
           
                </Field>
              );
            }
            })
          })
        }
    </Fieldset>
  );

};
// SelectField.propTypes = SelectFieldAttributes; // Apply the predefined PropTypes
export default CArrayField;


