import React, { useEffect } from 'react';
import { useFieldArray,useFormContext } from 'react-hook-form';
import {Input , Field , Legend , Label, Description , Fieldset} from '@headlessui/react'
import clsx from 'clsx';
import { ErrorMessage } from "@hookform/error-message"


function compileCondition(condition) {
  // recursive function to go through the conditions and join the them into a singe string 
  
  if (condition.and) {
    return condition.and.map(compileCondition).filter(Boolean).join(' && ');
  } else if (condition.property) {
    if (condition.notNull) {
      return `${condition.property}`;
    } else if (condition.greaterThan) {
        if(condition.eval_method && condition.eval_method === 'eval'){
          // evaluate the expression
          // const eval_var = eval(condition.greaterThan);
          return `${condition.property} > ${condition.greaterThan}`;

        }
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

function compile(obj) {
  const condition = compileCondition(obj.if);
  const action = compileAction(obj.action);
  return new Function('watchFields', 'FieldValues' ,   'append', `if (${condition}) { ${action} }`);
}



const CArrayField = ({ name  , AttributesKey:{fieldArrayName , key}  , AttributeSchema , ResponseSchema })  => {
  const { title, description, type, isMandatory , condition } = AttributeSchema[`${fieldArrayName}.${key}`];
  // default fields
  const FieldValues = ResponseSchema[`${fieldArrayName}`][0][`${key}`][0];

  // / form context 
  const { register, control, setValue, watch, formState: {errors}} = useFormContext();

  // define the field array
  const { fields, append, prepend, remove, swap, move, insert , update } = useFieldArray({
    control: control,
    name: name
  });

  
  const watchFields = watch(name);
  const compiledFunction = compile(condition);
 

  useEffect(() => {
    compiledFunction(watchFields , FieldValues , append)
  }, [watchFields?.[watchFields.length-1][condition?.fieldName]]);


  return (

      <Fieldset className="">
        <Legend className="text-base/7 font-semibold text-white">{title}</Legend>
        {
          fields.map((field, index) => {
            return (
              <div key={index}>
                {Object.keys(field).map((k) => {
                  if (k !== 'id') {
                    return (
                      <Field key={k}>
                        <Label className="text-sm/6 font-medium text-white">{AttributeSchema[`${fieldArrayName}.${key}.${k}`].title}</Label>
                        <Input className={clsx(
                          'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                          'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                        )}
                        {...register(`${name}.${index}.${k}`)} />
                      </Field>
                    );
                  }
                  return null;
                })}
                <button type="button" onClick={() => remove(index)}>Remove Address</button>
              </div>
            );
          })
        }


    <ErrorMessage
        errors={errors}
        name={name}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => {
            return (
            <p className='text-red-400' key={type}>{message}</p>
          )
        })
        }
      />    
        
      </Fieldset>
        );

};
// SelectField.propTypes = SelectFieldAttributes; // Apply the predefined PropTypes
export default CArrayField;


