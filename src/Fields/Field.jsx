import React , {FC} from 'react';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { FieldType, BaseFieldAttributes } from './FieldAttributes'; // Adjust path as necessary
import InputField from './InputField';
import SelectField from './SelectField';
import ArrayField from './ArrayField';
import CArrayField from './CArrayField';
import PhoneField from './PhoneField';
import CheckboxField from './CheckboxField';
import CCheckboxField from './CCheckboxField';
import TextAreaField from './TextAreaField';
// import SelectAddress from './SelectAddress';





const Field = ({name , Attributes}) => {

  switch (Attributes.type) {
    case FieldType.TEXT:
      return <InputField name={name} Attributes={Attributes} />;
    case FieldType.DATE:
        return <InputField name={name} Attributes={Attributes} />;
    case FieldType.PHONE:
          return <PhoneField name={name} Attributes={Attributes}  />;
    case FieldType.SELECT:
      return <SelectField name={name} Attributes={Attributes} />;
    case FieldType.ARRAY:
      return <ArrayField name={name} Attributes={Attributes}  />;
    case FieldType.CARRAY:
      return <CArrayField name={name} Attributes={Attributes}  />;
    case FieldType.CHECKBOX:
      return <CheckboxField name={name} Attributes={Attributes} />;
    case FieldType.CCHECKBOX:
        return <CCheckboxField name={name} Attributes={Attributes} />;
    case FieldType.TEXTAREA:
          return <TextAreaField name={name} Attributes={Attributes} />;

    default:
      console.error('Unsupported field type');
      console.log('field', field);
      return null ;
  }
};

// Field.propTypes = BaseFieldAttributes; // Use imported BaseFieldAttributes for prop validation
export default Field;
