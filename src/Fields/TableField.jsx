import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
// import { Field, Label, Input, Description, Select } from '@headlessui/react';
import clsx from 'clsx';
import { FaChevronDown } from "react-icons/fa";

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

  const renderCell = (field, rowIndex, column) => {
    const fieldName = `${name}[${rowIndex}].${column.name}`;
    switch (column.type) {
      case 'text':
        return (
          <Input
            className={clsx(
              'block w-full rounded-lg border border-gray-300 py-1.5 px-3 text-sm',
              'focus:outline-none focus:border-blue-500'
            )}
            {...register(fieldName)}
            type="text"
            style={{ color: 'black' }} // Ensure the text color is black or another contrasting color
          />
        );
      case 'select':
        return (
          <div className="relative">
            <Select
              className={clsx(
                'mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-black',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
              )}
              {...register(fieldName)}
            >
              {column.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <FaChevronDown
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60" />
          </div>
        );
      case 'checkbox':
        return (
          <Input
            type="checkbox"
            className={clsx(
              'block rounded-lg border border-gray-300 py-1.5 px-3 text-sm',
              'focus:outline-none focus:border-blue-500'
            )}
            {...register(fieldName)}
          />
        );
      default:
        return null;
    }
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
                  {renderCell(field, rowIndex, column)}
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

