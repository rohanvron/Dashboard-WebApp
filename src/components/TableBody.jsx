import React from 'react';
import { flexRender } from '@tanstack/react-table';

const TableBody = ({ rows, onRowClick }) => {
  return (
    <tbody>
      {rows.map((row, index) => (
        <tr key={row.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className={`px-4 py-2.5 border-y ${
                cell.column.id !== 'actions' ? 'cursor-pointer' : ''
              }`}
              onClick={() => {
                if (cell.column.id !== 'actions') {
                  onRowClick(row.original);
                }
              }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
