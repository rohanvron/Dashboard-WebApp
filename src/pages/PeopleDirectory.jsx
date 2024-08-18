import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import PeopleTable from '../components/PeopleTable';

const PeopleDirectory = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-row h-screen">
        <Sidebar />
        <PeopleTable />
      </div>
    </>
  );
};

export default PeopleDirectory;
