

// import React from 'react';
// import { useFieldArray, useFormContext } from 'react-hook-form';
//
// const DynamicTableField = ({ fields, formMethods }) => {
//   const { control } = useFormContext();
//   const { fields: rows, append, remove } = useFieldArray({
//     control,
//     name: 'dynamic table', // Adjust this name according to your form structure
//   });
//
//   const addRow = () => {
//     const newRow = fields.reduce((acc, field) => {
//       acc[field.name] = field.type === 'checkbox' ? false : '';
//       console.log('acc',acc);// Initialize checkbox fields with false
//       return acc;
//     }, {});
//     append(newRow);
//   };
//
//   const removeRow = (index) => remove(index);
//
//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             {fields.map((field) => (
//               <th key={field.id}>{field.title}</th>
//             ))}
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, index) => (
//             <tr key={row.id}>
//               {fields.map((field) => (
//                 <td key={`${row.id}-${field.id}`}>
//                   {field.type === 'checkbox' ? (
//                     <input
//                       type="checkbox"
//                       {...control.register(`dynamicTable[${index}][${field.name}]`)}
//                     />
//                   ) : (
//                     <input
//                       type={field.type}
//                       {...control.register(`dynamicTable[${index}][${field.name}]`)}
//                     />
//                   )}
//                 </td>
//               ))}
//               <td>
//                 <button onClick={() => removeRow(index)}>Remove</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button onClick={addRow}>Add Row</button>
//     </div>
//   );
// };
//
// export default DynamicTableField;

// import React, { useEffect } from 'react';
// import { useFormContext, useFieldArray } from 'react-hook-form';
//
// const DynamicTableField = ({ fields }) => {
//   const { control, register } = useFormContext();
//   const { fields: rows, append, remove } = useFieldArray({
//     control,
//     name: 'dynamicTable', // Adjust this name according to your form structure
//   });
//
//   // useEffect(() => {
//   //   if (rows.length === 0) {
//   //     addRow();
//   //   }
//   // }, []);
//
//   console.log('fields',fields);
//
//   const addRow = () => {
//     const newRow = fields.reduce((acc, field) => {
//       acc[field.name] = field.type === 'checkbox' ? false : ''; // Initialize checkbox fields with false
//       return acc;
//     }, {});
//     append(newRow);
//   };
//
//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             {fields.map((field) => (
//               <th key={field.id}>{field.title}</th>
//             ))}
//             <th>Actions</th>
//           </tr>
//         </thead>
//         {/*<tbody>*/}
//         {/*  {rows.map((row, index) => (*/}
//         {/*    <tr key={row.id}>*/}
//         {/*      {fields.map((field) => (*/}
//         {/*        <td key={`${row.id}-${field.id}`}>*/}
//         {/*          {field.type === 'checkbox' ? (*/}
//         {/*            <input*/}
//         {/*              type="checkbox"*/}
//         {/*              {...register(`dynamicTable[${index}][${field.name}]`)}*/}
//         {/*              defaultChecked={row[field.name]}*/}
//         {/*            />*/}
//         {/*          ) : (*/}
//         {/*            <input*/}
//         {/*              type={field.type}*/}
//         {/*              {...register(`dynamicTable[${index}][${field.name}]`)}*/}
//         {/*              defaultValue={row[field.name]}*/}
//         {/*            />*/}
//         {/*          )}*/}
//         {/*        </td>*/}
//         {/*      ))}*/}
//         {/*      <td>*/}
//         {/*        <button type="button" onClick={() => remove(index)}>Remove</button>*/}
//         {/*      </td>*/}
//         {/*    </tr>*/}
//         {/*  ))}*/}
//         {/*</tbody>*/}
//       </table>
//       <button type="button" onClick={addRow}>Add Row</button>
//     </div>
//   );
// };
//
// export default DynamicTableField;


import React, { useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';

const DynamicTableField = ({ fields }) => {
  const { control, register } = useFormContext();
  const { fields: rows, append, remove } = useFieldArray({
    control,
    name: 'dynamicTable', // Adjust this name according to your form structure
  });

  console.log('fields', fields);

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
        {/* <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              {fields.map((field) => (
                <td key={`${row.id}-${field.id}`}>
                  {field.type === 'checkbox' ? (
                    <input
                      type="checkbox"
                      {...register(`dynamicTable[${index}][${field.name}]`)}
                      defaultChecked={row[field.name]}
                    />
                  ) : (
                    <input
                      type={field.type}
                      {...register(`dynamicTable[${index}][${field.name}]`)}
                      defaultValue={row[field.name]}
                    />
                  )}
                </td>
              ))}
              <td>
                <button type="button" onClick={() => removeRow(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody> */}
      </table>
      {/* <button type="button" onClick={addRow}>Add Row</button> */}
    </div>
  );
};

export default DynamicTableField;

