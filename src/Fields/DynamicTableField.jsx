// // DynamicTableField.jsx
// import React, { useState } from 'react';
//
// const DynamicTableField = ({ schema }) => {
//   const [rows, setRows] = useState([]);
//
//   const handleAddRow = () => {
//     const newRow = schema.columns.reduce((acc, col) => ({
//       ...acc,
//       [col.id]: '' // initialize with default empty strings or appropriate values
//     }), {});
//     setRows([...rows, newRow]);
//   };
//
//   const handleChange = (index, column, value) => {
//     const updatedRows = rows.map((row, i) => i === index ? { ...row, [column]: value } : row);
//     setRows(updatedRows);
//   };
//
//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             {schema.columns.map(column => <th key={column.id}>{column.label}</th>)}
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, index) => (
//             <tr key={index}>
//               {schema.columns.map(column => (
//                 <td key={column.id}>
//                   <input
//                     type="text"
//                     value={row[column.id]}
//                     onChange={(e) => handleChange(index, column.id, e.target.value)}
//                   />
//                 </td>
//               ))}
//               <td><button onClick={() => handleAddRow()}>+</button></td>
//             </tr>
//           ))}
//           {rows.length === 0 && <tr><td colSpan={schema.columns.length + 1}><button onClick={handleAddRow}>Add Row</button></td></tr>}
//         </tbody>
//       </table>
//     </div>
//   );
// };
//
// export default DynamicTableField;

import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const DynamicTableField = ({ fields, formMethods }) => {
  const { control } = useFormContext();
  const { fields: rows, append, remove } = useFieldArray({
    control,
    name: 'dynamic table', // Adjust this name according to your form structure
  });

  const addRow = () => {
    const newRow = fields.reduce((acc, field) => {
      acc[field.name] = field.type === 'checkbox' ? false : ''; // Initialize checkbox fields with false
      return acc;
    }, {});
    append(newRow);
  };

  const removeRow = (index) => remove(index);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={field.id}>{field.title}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              {fields.map((field) => (
                <td key={`${row.id}-${field.id}`}>
                  {field.type === 'checkbox' ? (
                    <input
                      type="checkbox"
                      {...control.register(`dynamicTable[${index}][${field.name}]`)}
                    />
                  ) : (
                    <input
                      type={field.type}
                      {...control.register(`dynamicTable[${index}][${field.name}]`)}
                    />
                  )}
                </td>
              ))}
              <td>
                <button onClick={() => removeRow(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow}>Add Row</button>
    </div>
  );
};

export default DynamicTableField;



