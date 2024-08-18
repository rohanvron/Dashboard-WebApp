import React from 'react';
import { flexRender } from '@tanstack/react-table';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FiMinus } from "react-icons/fi";

const TableHeader = ({ headerGroups }) => {
  return (
    <thead>
  {headerGroups.map((headerGroup) => (
    <tr key={headerGroup.id}>
      {headerGroup.headers.map((header) => (
        <th
          key={header.id}
          className={`px-4 py-3 bg-white border-y text-left font-normal text-sm ${
            header.column.columnDef.header === 'Name'
              ? 'w-[22rem]'
              : header.column.columnDef.header === 'Status'
              ? 'w-1/12'
              : header.column.columnDef.header === 'Role'
              ? 'w-[14rem]'
              : header.column.columnDef.header === 'Email Address'
              ? 'w-18'
              : header.column.columnDef.header === 'Teams'
              ? 'w-1/4'
              : header.id === 'actions'
              ? 'w-1/12'
              : ''
          }`}
        >
              {flexRender(header.column.columnDef.header, header.getContext())}
              {header.column.getCanSort() && (
                <button
                  onClick={header.column.getToggleSortingHandler()}
                  className="ml-2 text-gray-500 hover:text-gray-700" 
                >
                  {header.column.getIsSorted() ? (
                    header.column.getIsSorted() === "desc" ? (
                      <MdKeyboardArrowDown className='inline-block' />
                    ) : (
                      <MdKeyboardArrowUp className='inline-block' />
                    )
                  ) : (
                    <FiMinus className='inline-block' />
                  )}
                </button>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;