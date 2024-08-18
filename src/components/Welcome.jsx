import React from 'react';

const Welcome = () => {
  return (
    <main className="flex-1 p-6" style={{ height: 'calc(100vh - var(--navbar-height))' }}>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full p-8">
        <h1 className="text-4xl font-bold text-gray-900">Welcome, Jane Doe!</h1>
      </div>
    </main>
  );
};

export default Welcome;
