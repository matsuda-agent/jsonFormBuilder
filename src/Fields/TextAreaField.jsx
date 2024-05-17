import React  , {useRef , useEffect , useState, Fragment} from 'react';
import { useFormContext } from 'react-hook-form';
import { InputFieldAttributes, FieldType } from './FieldAttributes'; // Adjust the import path as necessary
import {Textarea , Field , Label, Description} from '@headlessui/react'
import clsx from 'clsx'

const TextAreaField = ({ field :{id  , name, title , type, isMandatory , description},   formMethods : {register , watch} }) => {

  const textareaRef = useRef(null);
  const [rows, setRows] = useState(3);
  const value = watch(name)


  useEffect(() => {
    const lineHeight = parseFloat(getComputedStyle(textareaRef.current).lineHeight);
    const lines = Math.ceil(textareaRef.current.scrollHeight / lineHeight);
    if (textareaRef.current && lines > rows && rows < 10) {
    
        setRows(rows + 1)
        console.log('rows', rows)
    }

    if (textareaRef.current && lines < rows && rows > 3) {
    
      setRows(rows - 1)
      console.log('rows', rows)
  }
  }, [value]); // Re-check whenever the value changesasdfasdfasdfasd



  return (
    <Field>
      <Label className="text-sm/6 font-medium text-white">{title}</Label>
      <Description className="text-sm/6 text-white/50">{description}</Description>

      <Textarea name={name} as={Fragment} rows={rows} {...register(name, { required: isMandatory })} >
      {({ focus, hover }) => (
        <textarea 
            className={clsx('mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white'
                      , focus &&'outline-2 outline-white/25 outline-offset-2')}  
            id={id}
            ref={textareaRef}

        ></textarea>
      )}
    </Textarea>
      {/* <Textarea as={Fragment} ref={textareaRef}>
          {({ focus, hover }) => (
            <textarea className={clsx('border', focus && 'bg-blue-100', hover && 'shadow')}
            {...register(name, { required: isMandatory })} type={type} id={id}
            ></textarea>
          )}
          rows={rows}
           
    </Textarea> */}
    </Field>
  );
};

// TextAreaField.propTypes = TextAreaFieldAttributes; // Apply the predefined PropTypes

export default TextAreaField;




// TextAreaField.propTypes = TextAreaFieldAttributes; // Apply the predefined PropTypes


