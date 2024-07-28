import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../atoms/jobAtom';
import Swal from 'sweetalert2';
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaDollarSign,
} from 'react-icons/fa';

const JobListingsPage = () => {
  const { jobs, loading } = useJobs();
  const [showAlert, setShowAlert] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let timer;
    if (loading && showAlert) {
      setShowSpinner(true);
      timer = setTimeout(() => {
        Swal.fire({
          title: 'Please Note',
          html: `
            <p>This project is for learning purposes.</p>
      <p>We use Render's free tier, causing occasional restarts.</p>
      <p>If you see this, Render is restarting due to inactivity.</p>
      <p>Please wait a moment and refresh the page. It may take 1-5 minutes.</p>
          `,
          icon: 'info',
          confirmButtonText: 'Understood',
        }).then(() => {
          setShowAlert(false);
          setShowSpinner(false);
        });
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [loading, showAlert]);

  useEffect(() => {
    if (jobs && jobs.length > 0) {
      // console.log(JSON.stringify(jobs, null, 2));
    }
  }, [jobs]);

  if (loading && showSpinner) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!Array.isArray(jobs)) {
    console.error('jobs is not an array:', jobs);
    return (
      <div className="container mx-auto px-4 py-8">Error: Invalid job data</div>
    );
  }

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
                disabled
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <select
              className="w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              disabled
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
              className="w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              disabled
            >
              <option value="">JOB TYPE</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
            <select
              className="w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              disabled
            >
              <option value="">SALARY RANGE</option>
              <option value="20000">฿20,000+</option>
              <option value="30000">฿30,000+</option>
              <option value="50000">฿50,000+</option>
            </select>
            <button
              className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              disabled
            >
              Search
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.length === 0 ? (
            <p className="text-gray-600 text-center col-span-full">
              No job positions match the criteria.
            </p>
          ) : (
            jobs.map((job) => (
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
                  {job.recruiterId?.logo && (
                    <img
                      src={job.recruiterId.logo}
                      alt={`${job.recruiterId?.companyName} logo`}
                      className="w-8 h-8 mr-2"
                    />
                  )}
                  <p className="text-gray-600 flex items-center">
                    <FaBriefcase className="mr-2 text-blue-500" />
                    {job.recruiterId?.companyName}
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
                  <FaMapMarkerAlt className="mr-2 text-blue-500" />
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
