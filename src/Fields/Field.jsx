import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldType } from './FieldAttributes'; // Adjust path as necessary
import InputField from './InputField';
import SelectField from './SelectField';
import ArrayField from './ArrayField';
import CArrayField from './CArrayField';
import PhoneField from './PhoneField';
import CheckboxField from './CheckboxField';
import CCheckboxField from './CCheckboxField';
import TextAreaField from './TextAreaField';
import TableField from './TableField'; // Import TableField






const Field = ({name  , AttributesKey:{fieldArrayName , key}  , AttributeSchema  ,ResponseSchema }) => {

  const type = AttributeSchema[`${fieldArrayName}.${key}`].type;
  

  switch (type) {
    case FieldType.TEXT:
      return <InputField name={name} AttributesKey={{ fieldArrayName, key }} AttributeSchema={AttributeSchema} />;
    case FieldType.DATE:
      return <InputField name={name} AttributesKey={{ fieldArrayName, key }} AttributeSchema={AttributeSchema} />;
    case FieldType.PHONE:
       return <PhoneField name={name} AttributesKey={{fieldArrayName , key}} AttributeSchema={AttributeSchema}  />;
    case FieldType.SELECT:
      return <SelectField name={name} AttributesKey={{ fieldArrayName, key }} AttributeSchema={AttributeSchema} />;
    case FieldType.ARRAY:
      return <ArrayField name={name} AttributesKey={{ fieldArrayName, key }} AttributeSchema={AttributeSchema} ResponseSchema={ResponseSchema}  />;
    case FieldType.CARRAY:
      return <CArrayField name={name} AttributesKey={{fieldArrayName , key}} AttributeSchema={AttributeSchema}  ResponseSchema={ResponseSchema}   />;
    case FieldType.CHECKBOX:
      return <CheckboxField name={name} AttributesKey={{ fieldArrayName, key }} AttributeSchema={AttributeSchema} />;
    case FieldType.CCHECKBOX:
      return <CCheckboxField name={name} AttributesKey={{ fieldArrayName, key }} AttributeSchema={AttributeSchema} />;
    case FieldType.TEXTAREA:
      return <TextAreaField name={name} AttributesKey={{ fieldArrayName, key }} AttributeSchema={AttributeSchema} />;
    case FieldType.TABLE: // Add case for TableField
      return <TableField name={name} columns={AttributeSchema[`${fieldArrayName}.${key}`].columns} />;
    default:
      console.error('Unsupported field type');
      console.log('field', name);
      return null;
  }
};

export default Field;

