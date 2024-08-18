import React from 'react';
import { FaRegBell } from "react-icons/fa6";

const Navbar = () => {

  return (
<div className="flex-1 flex flex-col">
        <header className="h-20 bg-white border-b flex items-center justify-between px-6">
          <h1 className="text-4xl font-bold text-purple-700 ml-4">PEOPLE.CO</h1>
          <div className="flex items-center">
            <button className="mr-4">
              <FaRegBell className="h-5 w-5 text-gray-500" />
            </button>
            <div className="flex items-center">
              <img className="h-8 w-8 rounded-full" src='https://avatar.iran.liara.run/public/boy?username=Ash' alt="User avatar" />
              <span className="ml-2 text-sm font-medium text-gray-700">Jane Doe</span>
            </div>
          </div>
        </header>
      </div>
  );
};

export default Navbar;