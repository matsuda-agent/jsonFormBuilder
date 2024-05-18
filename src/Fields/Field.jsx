import React from 'react';
import { FieldType } from './FieldAttributes'; // Ensure this import reflects your actual structure
import InputField from './InputField';
import SelectField from './SelectField';
import ArrayField from './ArrayField';
import CArrayField from './CArrayField';
import PhoneField from './PhoneField';
import DynamicTableField from './DynamicTableField';

const Field = ({ field, form, formMethods, index }) => {
  // Ensure form and field are defined
  if (!form || !field) {
    console.error('Form or field is undefined');
    return null;
  }

  // Handle form types that might dictate the field rendering
  if (form.type === 'dynamic table') {
    return <DynamicTableField fields={form.fields} formMethods={formMethods} />;
  }

  // Handle based on field type
  switch (field.type) {
    case FieldType.TEXT:
    case FieldType.DATE:
      return <InputField field={field} formMethods={formMethods} />;
    case FieldType.PHONE:
      return <PhoneField field={field} formMethods={formMethods} index={index}/>;
    case FieldType.SELECT:
      return <SelectField field={field} formMethods={formMethods} />;
    case FieldType.ARRAY:
      return <ArrayField field={field} formMethods={formMethods} />;
    case FieldType.CARRAY:
      return <CArrayField field={field} formMethods={formMethods} />;
    default:
      console.error('Unsupported field type:', field.type);
      return <p>Unsupported Field Type</p>;
  }
};

export default Field;


