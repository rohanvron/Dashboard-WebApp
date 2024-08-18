import React from 'react';

const MemberDetailsPane = ({ member, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Member Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center mb-4">
          <img
            src={member.profilePicture}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-gray-500">{member.username}</p>
          </div>
        </div>
      <div className="mb-4">
        <h4 className="text-lg font-bold mb-2">Role</h4>
        <p>{member.role}</p>
      </div>
      <div className="mb-4">
        <h4 className="text-lg font-bold mb-2">Email</h4>
        <p>{member.email}</p>
      </div>
      <div className="mb-4">
        <h4 className="text-lg font-bold mb-2">Status</h4>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
            member.status === 'Active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          <span
            className={`w-2 h-2 mr-1.5 rounded-full ${
              member.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
            }`}
          ></span>
          {member.status}
        </span>
      </div>
      <div className="mb-4">
        <h4 className="text-lg font-bold mb-2">Teams</h4>
        <div className="flex flex-wrap">
          {member.teams.map((team, index) => (
            <span
              key={index}
              className={`rounded-full px-2 py-1 text-xs font-semibold mr-2 ${
                team === 'Design'
                  ? 'bg-blue-200 text-blue-800'
                  : team === 'Product'
                  ? 'bg-green-200 text-green-800'
                  : team === 'Marketing'
                  ? 'bg-yellow-200 text-yellow-800'
                  : 'bg-purple-200 text-purple-800'
              }`}
            >
              {team}
            </span>
          ))}
        </div>
        </div>
    </div>
    </div>
  );
};

export default MemberDetailsPane;