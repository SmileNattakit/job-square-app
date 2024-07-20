import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../atoms/jobAtom';
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaDollarSign,
} from 'react-icons/fa';

const JobListingsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    salaryRange: '',
  });
  const { jobs, loading } = useJobs();

  useEffect(() => {
    if (jobs && jobs.length > 0) {
      // console.log(JSON.stringify(jobs, null, 2));
    }
  }, [jobs]);

  const filteredJobs = Array.isArray(jobs)
    ? jobs.filter((job) => {
        const matchesSearchTerm =
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          !filters.category || job.category === filters.category;
        const matchesType = !filters.type || job.type === filters.type;
        const matchesSalaryRange =
          !filters.salaryRange ||
          parseInt(job.salary) >= parseInt(filters.salaryRange);
        return (
          matchesSearchTerm &&
          matchesCategory &&
          matchesType &&
          matchesSalaryRange
        );
      })
    : [];

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">กำลังโหลด...</div>;
  }

  if (!Array.isArray(jobs)) {
    console.error('jobs is not an array:', jobs);
    return (
      <div className="container mx-auto px-4 py-8">Error: Invalid job data</div>
    );
  }

  // console.log(jobs);
  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Discover Your Career Path at JobSquare
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Connect with real employers, explore genuine opportunities, and take
          the next step in your professional journey.
        </p>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search for jobs..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">JOB CATEGORY</option>
              <option value="Software">Software</option>
              <option value="Design">Design</option>
              <option value="Data">Data</option>
              <option value="Hardware">Hardware</option>
              <option value="Content">Content</option>
              <option value="Engineering">Engineering</option>
            </select>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">JOB TYPE</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
            <select
              value={filters.salaryRange}
              onChange={(e) =>
                handleFilterChange('salaryRange', e.target.value)
              }
              className="w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">SALARY RANGE</option>
              <option value="20000">฿20,000+</option>
              <option value="30000">฿30,000+</option>
              <option value="50000">฿50,000+</option>
            </select>
            <button className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
              Search
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.length === 0 ? (
            <p className="text-gray-600 text-center col-span-full">
              ไม่พบตำแหน่งงานที่ตรงกับเงื่อนไข
            </p>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 relative"
              >
                <div className="text-sm text-gray-500 mb-2">
                  {new Date(job.posted).toLocaleDateString()}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {job.title}
                </h3>
                <div className="flex items-center mb-4">
                  {job.logo && (
                    <img
                      src={job.recruiterId.logo}
                      alt={`${job.recruiterId.companyName} logo`}
                      className="w-8 h-8 mr-2"
                    />
                  )}
                  <p className="text-gray-600 flex items-center">
                    <FaBriefcase className="mr-2 text-blue-500" />{' '}
                    {job.recruiterId.companyName}
                  </p>
                </div>
                {job.tags && job.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-gray-500 flex items-center mb-2">
                  <FaMapMarkerAlt className="mr-2 text-blue-500" />{' '}
                  {job.location}
                </p>
                <p className="text-gray-500 flex items-center mb-2">
                  <FaClock className="mr-2 text-blue-500" /> {job.type}
                </p>
                <p className="text-gray-500 flex items-center mb-4">
                  <FaDollarSign className="mr-2 text-blue-500" /> {job.salary}
                </p>
                <Link
                  to={`/job-listings/${job._id}`}
                  state={{ job }}
                  className="btn bg-blue-500 text-white"
                >
                  Details
                </Link>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default JobListingsPage;
