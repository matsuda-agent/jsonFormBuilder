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
import CRadioField from './CRadioField'; // Import CRadioField






const Field = ({name , Attributes, validations }) => {

  const type = Attributes.type;

  switch (type) {
    case FieldType.TEXT:
      return <InputField name={name} Attributes={Attributes}  validations={validations} />;
    case FieldType.NUMBER:
      return <InputField name={name} Attributes={Attributes} validations={validations}  />;
    // case FieldType.DATE:
    //   return <InputField name={name} Attributes={Attributes} validations={validations}  />;
    // case FieldType.PHONE:
    //    return <PhoneField name={name} AttributesKey={{fieldArrayName , key}}   />;
    case FieldType.SELECT:
      return <SelectField name={name} Attributes={Attributes} validations={validations}   />;
    // case FieldType.ARRAY:
    //   return <ArrayField name={name} AttributesKey={{ fieldArrayName, key }}   />;
    // case FieldType.CARRAY:
    //   return <CArrayField name={name} AttributesKey={{fieldArrayName , key}}     />;
    // case FieldType.CHECKBOX:
    //   return <CheckboxField name={name} AttributesKey={{ fieldArrayName, key }}  />;
    // case FieldType.CCHECKBOX:
    //   return <CCheckboxField name={name} AttributesKey={{ fieldArrayName, key }}  index={index} />;
    // case FieldType.TEXTAREA:
    //   return <TextAreaField name={name} AttributesKey={{ fieldArrayName, key }}  />;
    // case FieldType.TABLE: // Add case for TableField
    //   return <TableField AttributesKey={{ fieldArrayName, key }}  />;
    case FieldType.CRADIO:
      return <CRadioField name={name}  Attributes={Attributes} validations={validations}  />;

    default:
      console.error('Unsupported field type' , name  , type);
      return null;
  }
};

export default Field;

