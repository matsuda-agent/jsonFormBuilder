// import { string, number, bool , oneOf, arrayOf , shape } from 'prop-types';

// Define field types as constants
export const FieldType = {
  TEXT: 'text',
  SELECT: 'select',
  ARRAY: 'array',
  CARRAY: 'carray',
  DATE: 'date',
  PHONE : 'phone',
  CHECKBOX : 'checkbox',
  CCHECKBOX : 'ccheckbox',
  TEXTAREA : 'textarea',
  TABLE : 'table',
  // ADDRESS: 'address',
};

// // Define PropTypes for a base field attribute structure
// export const BaseFieldAttributes = {
//   id: string.isRequired,
//   title: string.isRequired,
//   description: string,
//   isMandatory: bool,
//   type: oneOf([FieldType.TEXT, FieldType.SELECT]).isRequired,
// };

// // Define PropTypes for input field attributes
// export const InputFieldAttributes = {
//   ...BaseFieldAttributes,
//   type: oneOf([FieldType.TEXT]),
// };

// // Define PropTypes for select field attributes including options
// export const SelectFieldAttributes = {
//   ...BaseFieldAttributes,
//   type: oneOf([FieldType.SELECT]),
//   options: arrayOf(shape({
//     label: string.isRequired,
//     value: string.isRequired,
//   })).isRequired,
// };

// // You would then use these PropTypes definitions to validate props in your components
