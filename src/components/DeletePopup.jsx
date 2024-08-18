import React from 'react';

const DeletePopup = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative mx-auto p-5 border w-1/4 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-left">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Delete Member Details</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this Member details? 
            This action cannot be undone.
          </p>
          <div className="flex justify-end mt-4">
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-purple-600 text-white text-base font-semibold rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
