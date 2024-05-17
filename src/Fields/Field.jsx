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





const Field = ({field , formMethods, index , fieldArrayName}) => {

  switch (field.type) {
    case FieldType.TEXT:
      return <InputField field={field} formMethods={formMethods} />;
    case FieldType.DATE:
        return <InputField field={field} formMethods={formMethods} />;
    case FieldType.PHONE:
          return <PhoneField field={field} formMethods={formMethods} index={index} fieldArrayName={fieldArrayName} />;
    case FieldType.SELECT:
      return <SelectField field={field} formMethods={formMethods} />;
    case FieldType.ARRAY:
      return <ArrayField field={field} formMethods={formMethods} />;
    case FieldType.CARRAY:
      return <CArrayField field={field} formMethods={formMethods} />;
    case FieldType.CHECKBOX:
      return <CheckboxField field={field} formMethods={formMethods} index={index} fieldArrayName={fieldArrayName}/>;
    case FieldType.CCHECKBOX:
        return <CCheckboxField field={field} formMethods={formMethods} index={index} fieldArrayName={fieldArrayName}/>;
    case FieldType.TEXTAREA:
          return <TextAreaField field={field} formMethods={formMethods} index={index} fieldArrayName={fieldArrayName}/>;

    default:
      console.error('Unsupported field type');
      console.log('field', field);
      return null ;
  }
};

// Field.propTypes = BaseFieldAttributes; // Use imported BaseFieldAttributes for prop validation
export default Field;
