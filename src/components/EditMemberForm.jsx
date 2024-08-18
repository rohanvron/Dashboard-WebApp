import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editMemberSchema } from '../utils/validationSchemas';
import { FaTimes } from 'react-icons/fa';

const EditMemberForm = ({ member, onSave, onClose }) => {
  const [profilePicture, setProfilePicture] = useState(member?.profilePicture || '');

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: member || {
      name: '',
      email: '',
      role: '',
      status: 'Active',
      teams: [],
    },
    resolver: zodResolver(editMemberSchema),
  });

  const onSubmit = (data) => {
    onSave({ ...data, profilePicture });
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{member ? 'Edit Profile' : 'Add Member'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex justify-center">
            <div className="relative">
              <img
                src={profilePicture || 'https://via.placeholder.com/100'}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <label htmlFor="profilePicture" className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </label>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              {...register('name')}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              {...register('email')}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 font-bold mb-2">Role</label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <select {...field} className="w-full px-3 py-2 border rounded-md">
                  <option value="">Select a role</option>
                  {['Product Designer', 'Product Manager', 'Frontend Developer', 'Backend Developer', 'UI Designer', 'Wordpress Developer', 'Software Engineer'].map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              )}
            />
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 font-bold mb-2">Status</label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <select {...field} className="w-full px-3 py-2 border rounded-md">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              )}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Teams</label>
            {['Design', 'Product', 'Marketing', 'Technology'].map((team) => (
              <div key={team} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`team-${team}`}
                  value={team}
                  {...register('teams')}
                  className="mr-2"
                />
                <label htmlFor={`team-${team}`}>{team}</label>
              </div>
            ))}
            {errors.teams && <p className="text-red-500 text-sm mt-1">{errors.teams.message}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              {member ? 'Save Changes' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMemberForm;