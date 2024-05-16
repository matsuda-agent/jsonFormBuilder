import React from 'react';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { FieldType, BaseFieldAttributes } from './FieldAttributes'; // Adjust path as necessary
import InputField from './InputField';
import SelectField from './SelectField';
import SelectAddress from './SelectAddress';


const Field = ({ type, ...props }) => {
  switch (type) {
    case FieldType.TEXT:
      return <InputField {...props} />;
    case FieldType.SELECT:
      return <SelectField {...props} />;
      // case FieldType.ADDRESS:
      //     return <SelectAddress {...props}/>;
    default:
      throw new Error("Invalid Field Type");
  }
};

Field.propTypes = BaseFieldAttributes; // Use imported BaseFieldAttributes for prop validation

export default Field;
