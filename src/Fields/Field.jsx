import React , {FC} from 'react';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { FieldType, BaseFieldAttributes } from './FieldAttributes'; // Adjust path as necessary
import InputField from './InputField';
import SelectField from './SelectField';
import ArrayField from './ArrayField';
// import SelectAddress from './SelectAddress';





const Field = ({field , formMethods}) => {

  switch (field.type) {
    case FieldType.TEXT:
      return <InputField field={field} formMethods={formMethods} />;
    case FieldType.SELECT:
      return <SelectField field={field} formMethods={formMethods} />;
    case FieldType.ARRAY:
      return <ArrayField field={field} formMethods={formMethods} />;

    default:
      console.error('Unsupported field type');
      console.log('field', field);
      return null ;
  }
};

// Field.propTypes = BaseFieldAttributes; // Use imported BaseFieldAttributes for prop validation

export default Field;
