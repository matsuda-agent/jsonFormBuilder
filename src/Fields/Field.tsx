import React from 'react';
import { FieldType } from './FieldAttributes'; // Adjust path as necessary
import InputField from './InputField';
import SelectField from './SelectField';
import CRadioField from './CRadioField'; // Import CRadioField
import DateRangeField from './DateRangeField';
import DateField from './DateField'; // Import DateField
import TextAreaField from './TextAreaField'; // Import TextAreaField


interface Attributes {
  type: string;
  title: string;
  description: string;
  disabled?: boolean;
  is_required: boolean;
  options?: any; // Replace 'any' with the actual type if known
  dependant_on?: any; // Replace 'any' with the actual type if known
  hidden?: boolean;
}

interface FieldProps {
  name: string;
  Attributes: Attributes;
  validations?: any; // Replace 'any' with the actual type if known
}



const Field: React.FC<FieldProps>  = ({name , Attributes, validations }) => {

  const type = Attributes.type;

  switch (type) {
    case FieldType.TEXT:
      return <InputField name={name} Attributes={Attributes}  validations={validations} />;
    case FieldType.NUMBER:
      return <InputField name={name} Attributes={Attributes} validations={validations}  />;
    case FieldType.CURRENCY:
        return <InputField name={name} Attributes={Attributes} validations={validations}  />;
    case FieldType.DATE:
      return <DateField name={name} Attributes={Attributes} validations={validations}  />;
    
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
    case FieldType.TEXTAREA:
      return <TextAreaField name={name} Attributes={Attributes} validations={validations}   />;
    // case FieldType.TABLE: // Add case for TableField
    //   return <TableField AttributesKey={{ fieldArrayName, key }}  />;
    case FieldType.CRADIO:
      return <CRadioField name={name}  Attributes={Attributes} validations={validations}  />;
    case FieldType.DATERANGE:
      return <DateRangeField name={name} Attributes={Attributes} validations={validations}  />;

    default:
      console.error('Unsupported field type' , name  , type);
      return null;
  }
};

export default Field;

