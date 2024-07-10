import React from 'react';
import { FaUser } from 'react-icons/fa';

const ApplicantForm = ({ register, errors }) => (
  <>
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="firstName"
      >
        First Name
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FaUser className="text-gray-500" />
        </span>
        <input
          type="text"
          id="firstName"
          {...register('firstName', { required: 'First Name is required' })} // Use register
          placeholder="First Name"
          className={`w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 ${
            errors.firstName ? 'border-red-500' : ''
          }`}
        />
      </div>
      {errors.firstName && (
        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
      )}{' '}
      {/* แสดงข้อความ error */}
    </div>
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="lastName"
      >
        Last Name
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FaUser className="text-gray-500" />
        </span>
        <input
          type="text"
          id="lastName"
          {...register('lastName', { required: 'Last Name is required' })} // Use register
          placeholder="Last Name"
          className={`w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 ${
            errors.lastName ? 'border-red-500' : ''
          }`}
        />
      </div>
      {errors.lastName && (
        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
      )}{' '}
      {/* แสดงข้อความ error */}
    </div>
  </>
);

export default ApplicantForm;
