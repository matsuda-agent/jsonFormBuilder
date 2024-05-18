import PropTypes from 'prop-types';

// Define field types as constants
export const FieldType = {
  TEXT: 'text',
  SELECT: 'select',
  ARRAY: 'array',
  CARRAY: 'carray',
  DATE: 'date',
  PHONE : 'phone',
  DTABLE : 'dynamic table'
  // ADDRESS: 'address',
};

// Define PropTypes for a base field attribute structure
export const BaseFieldAttributes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  isMandatory: PropTypes.bool,
  type: PropTypes.oneOf([FieldType.TEXT, FieldType.SELECT]).isRequired,
};

// Define PropTypes for input field attributes
export const InputFieldAttributes = {
  ...BaseFieldAttributes,
  type: PropTypes.oneOf([FieldType.TEXT]),
};

// Define PropTypes for select field attributes including options
export const SelectFieldAttributes = {
  ...BaseFieldAttributes,
  type: PropTypes.oneOf([FieldType.SELECT]),
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

// You would then use these PropTypes definitions to validate props in your components
