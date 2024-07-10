import React from 'react';
import { FaBuilding } from 'react-icons/fa';

const RecruiterForm = ({ register, errors }) => (
  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor="companyName"
    >
      Company Name
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <FaBuilding className="text-gray-500" />
      </span>
      <input
        type="text"
        id="companyName"
        {...register('companyName', { required: 'Company Name is required' })} // Use register
        placeholder="Company Name"
        className={`w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 ${
          errors.companyName ? 'border-red-500' : ''
        }`}
      />
    </div>
    {errors.companyName && ( // แสดงข้อความ error
      <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
    )}
  </div>
);

export default RecruiterForm;
