import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Field, Label, Input, Description } from '@headlessui/react';
import clsx from 'clsx';

const TableField = ({ name, columns }) => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name
  });

  const addRow = () => {
    const newRow = columns.reduce((acc, column) => {
      acc[column.name] = '';
      return acc;
    }, {});
    append(newRow);
  };

  return (
    <div className="w-full my-3">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.name} className="py-2 px-4 border-b border-gray-300 text-left">
                {column.title}
              </th>
            ))}
            <th className="py-2 px-4 border-b border-gray-300 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, rowIndex) => (
            <tr key={field.id}>
              {columns.map((column) => (
                <td key={column.name} className="py-2 px-4 border-b border-gray-300">
                  <Input
                    className={clsx(
                      'block w-full rounded-lg border border-gray-300 py-1.5 px-3 text-sm',
                      'focus:outline-none focus:border-blue-500'
                    )}
                    {...register(`${name}[${rowIndex}].${column.name}`)}
                    type="text"
                    style={{ color: 'black' }} // Ensure the text color is black or another contrasting color
                  />
                </td>
              ))}
              <td className="py-2 px-4 border-b border-gray-300">
                <button
                  type="button"
                  onClick={() => remove(rowIndex)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        onClick={addRow}
        className="mt-3 bg-purple-400 text-white py-1.5 px-4 rounded-lg"
      >
        Add Row
      </button>
    </div>
  );
};

export default TableField;
