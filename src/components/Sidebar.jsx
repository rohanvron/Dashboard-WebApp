import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdViewCompactAlt } from 'react-icons/md';

const Sidebar = ({ selectedTab, setSelectedTab }) => {
  const location = useLocation();

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <aside className="w-64 bg-white">
      <nav className="mt-6 pl-6 text-lg font-bold">
        <div
          onClick={() => handleTabChange('overview')}
          className={`flex items-center py-2 px-4 cursor-pointer ${
            selectedTab === 'overview' ? 'text-purple-700' : 'text-gray-600'
          }`}
        >
          <MdViewCompactAlt
            className={`mr-2 ${
              selectedTab === 'overview' ? 'text-purple-700' : 'text-gray-600'
            } size-7`}
          />
          Overview
        </div>
        <div
          onClick={() => handleTabChange('people')}
          className={`flex items-center py-2 px-4 cursor-pointer ${
            selectedTab === 'people' ? 'text-purple-700' : 'text-gray-600'
          }`}
        >
          <MdViewCompactAlt
            className={`mr-2 cursor-pointer ${
              selectedTab === 'people' ? 'text-purple-700' : 'text-gray-600'
            } size-7`}
          />
          People Directory
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
