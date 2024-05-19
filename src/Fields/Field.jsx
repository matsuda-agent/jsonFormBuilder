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





const Field = ({name  , AttributesKey:{fieldArrayName , key}  , AttributeSchema }) => {

  const type = AttributeSchema[`${fieldArrayName}.${key}`].type;


  switch (type) {
    case FieldType.TEXT:
        return <InputField name={name} AttributesKey={{fieldArrayName , key}} AttributeSchema={AttributeSchema}  />;
    case FieldType.DATE:
        return <InputField name={name} AttributesKey={{fieldArrayName , key}} AttributeSchema={AttributeSchema}  />;
    case FieldType.PHONE:
          return <PhoneField name={name} AttributesKey={{fieldArrayName , key}} AttributeSchema={AttributeSchema}   />;
    case FieldType.SELECT:
      return <SelectField name={name} AttributesKey={{fieldArrayName , key}} AttributeSchema={AttributeSchema}  />;
    case FieldType.ARRAY:
      return <ArrayField name={name} AttributesKey={{fieldArrayName , key}} AttributeSchema={AttributeSchema}   />;
    case FieldType.CARRAY:
      return <CArrayField name={name} AttributesKey={{fieldArrayName , key}} AttributeSchema={AttributeSchema}   />;
    case FieldType.CHECKBOX:
      return <CheckboxField name={name} AttributesKey={{fieldArrayName , key}} AttributeSchema={AttributeSchema}  />;
    case FieldType.CCHECKBOX:
        return <CCheckboxField name={name} AttributesKey={{fieldArrayName , key}} AttributeSchema={AttributeSchema}  />;
    case FieldType.TEXTAREA:
          return <TextAreaField name={name} AttributesKey={{fieldArrayName , key}} AttributeSchema={AttributeSchema}  />;

    default:
      console.error('Unsupported field type');
      console.log('field', name);
      return null ;
  }
};

// Field.propTypes = BaseFieldAttributes; // Use imported BaseFieldAttributes for prop validation
export default Field;
