import React from 'react';
import { MdOutlineArrowOutward } from 'react-icons/md';
import { faker } from '@faker-js/faker';

const MemberDetailsPane = ({ member, onClose }) => {
  const publication = {
    title: 'AI in the User Experience: The Future of Design',
    journal: 'Journal of Modern Design',
    year: '2022',
    abstract: 'AI-based breast cancer prediction models in medical machines using Python language...',
  };

  return (
    <div className="fixed right-0 top-0 h-full w-1/2 bg-white shadow-lg overflow-y-auto">
      <div className="flex justify-between items-center p-3">
        <button onClick={onClose} className="text-gray-500 hover:text-red-500">
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
      <div className="flex items-center bg-sky-900 p-4">
        <img
          src={member.profilePicture}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover mr-4"
        />
        <div className='p-4'>
          <h3 className="text-xl font-bold mb-4 text-white">{member.name}</h3>
          <p className="text-white">
            User ID: {member.username} | Role:<span className="ml-2">{member.role}</span>
          </p>
        </div>
      </div>
      <div>
      <h4 className="text-lg font-bold mb-2 border p-3 bg-sky-100">Personal Information</h4>
      <div className='px-4'>
        <div className="border-b py-2">
          <p className='font-semibold'>Date of Birth:
          <span className='ml-2 font-normal'>
            {faker.date.birthdate({ min: 1970, max: 2000, mode: 'year' }).toLocaleDateString()}
          </span>
          </p>
        </div>
        
        <div className="border-b border-gray-200 py-2">
          <p className='font-semibold'>Gender: 
          <span 
            className='ml-2 font-normal'> Male
            </span>
            </p>
        </div>
        <div className="border-b border-gray-200 py-2">
          <p className='font-semibold'>Nationality: <span className='ml-2 font-normal'>{faker.address.country()}</span></p>
        </div>
        <div className="border-b border-gray-200 py-2">
          <p className='font-semibold'>Contact No:<span className='ml-2 font-normal'> 1234567890</span></p>
        </div>
        <div className="border-b border-gray-200 py-2">
          <p className='font-semibold'>Email Address: <span className='ml-2 font-normal'>{member.email}</span></p>
        </div>
        <div className="py-2">
          <p className='font-semibold'>Work Email Address: <span className='ml-2 font-normal'>{member.email}</span></p>
        </div>
      </div>
      </div>
      <div className="my-4">
        <h4 className="text-lg font-bold border p-3 bg-sky-100">Research And Publications</h4>
        <div className="border p-4">
          <h5 className="text-md font-semibold">{publication.title}</h5>
          <p className='italic'>{publication.journal}, {publication.year}</p>
          <p className='mt-2 text-sm'>{publication.abstract}</p>
          <button className="flex items-center mt-2 text-orange-600 hover:bg-gray-200 rounded-md px-2 py-1">
            <MdOutlineArrowOutward className="mr-1" />
            See Publication
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsPane;
