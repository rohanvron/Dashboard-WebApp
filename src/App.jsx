import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Welcome from './components/Welcome';
import PeopleTable from './components/PeopleTable';

function App() {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <Router>
      
      <Navbar />
      <div className="flex flex-row h-screen">
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            {selectedTab === 'overview' ? (
              <Welcome />
            ) : (
              <PeopleTable />
            )}
          </div>
   
    </Router>
  );
}

export default App;
