import React from 'react';
import { FaFilter } from 'react-icons/fa';

const JobFilters = ({ filters, setFilters }) => {
  const [showFilters, setShowFilters] = React.useState(false); // State สำหรับ toggle filter

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="relative">
      {/* ปุ่ม Filter */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
        onClick={() => setShowFilters(!showFilters)}
      >
        <FaFilter className="mr-2" /> Filter
      </button>

      {/* ส่วนของ Filter (แสดงเมื่อ showFilters เป็น true) */}
      {showFilters && (
        <div className="absolute z-10 mt-2 bg-white rounded-lg shadow-lg p-4 w-64">
          <h3 className="text-lg font-semibold mb-2">Filter Jobs</h3>

          {/* Dropdown สำหรับประเภทงาน */}
          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              ประเภทงาน
            </label>
            <select
              id="type"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">ทั้งหมด</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          {/* Dropdown สำหรับสถานที่ */}
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              สถานที่
            </label>
            <select
              id="location"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">ทั้งหมด</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
              {/* ... เพิ่มสถานที่อื่นๆ ... */}
            </select>
          </div>

          {/* Input สำหรับเงินเดือน (Min) */}
          <div className="mb-4">
            <label
              htmlFor="salaryMin"
              className="block text-sm font-medium text-gray-700"
            >
              เงินเดือน (ขั้นต่ำ)
            </label>
            <input
              type="number"
              id="salaryMin"
              value={filters.salaryMin}
              onChange={(e) => handleFilterChange('salaryMin', e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>

          {/* Input สำหรับเงินเดือน (Max) */}
          <div className="mb-4">
            <label
              htmlFor="salaryMax"
              className="block text-sm font-medium text-gray-700"
            >
              เงินเดือน (สูงสุด)
            </label>
            <input
              type="number"
              id="salaryMax"
              value={filters.salaryMax}
              onChange={(e) => handleFilterChange('salaryMax', e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilters;
