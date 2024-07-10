import React, { useState } from 'react';
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
} from 'react-icons/fa';

const YourApplications = () => {
  const [activeTab, setActiveTab] = useState('All');

  // Mock data for applications
  const [applications, setApplications] = useState([
    {
      id: 1,
      jobTitle: 'Senior Software Developer',
      company: 'Tech Innovators Inc.',
      location: 'San Francisco, CA',
      appliedDate: '2023-06-15',
      status: 'Under Review',
    },
    {
      id: 2,
      jobTitle: 'UX Designer',
      company: 'Creative Designs Co.',
      location: 'New York, NY',
      appliedDate: '2023-06-10',
      status: 'Interviewed',
    },
    {
      id: 3,
      jobTitle: 'Data Analyst',
      company: 'Data Insights Ltd.',
      location: 'Chicago, IL',
      appliedDate: '2023-06-05',
      status: 'Rejected',
    },
    {
      id: 4,
      jobTitle: 'Product Manager',
      company: 'Innovative Solutions',
      location: 'Austin, TX',
      appliedDate: '2023-06-20',
      status: 'Accepted',
    },
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Accepted':
        return <FaCheckCircle className="text-green-500" />;
      case 'Rejected':
        return <FaTimesCircle className="text-red-500" />;
      case 'Interviewed':
        return <FaClock className="text-yellow-500" />;
      default:
        return <FaSpinner className="text-blue-500" />;
    }
  };

  const filteredApplications =
    activeTab === 'All'
      ? applications
      : applications.filter((app) => app.status === activeTab);

  const tabs = ['All', 'Under Review', 'Interviewed', 'Accepted', 'Rejected'];

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Your Applications
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`mr-2 mb-2 px-4 py-2 rounded-lg font-medium ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Applications Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredApplications.map((application) => (
            <div
              key={application.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {application.jobTitle}
                </h3>
                <div className="flex items-center">
                  {getStatusIcon(application.status)}
                  <span className="ml-2 text-sm font-medium text-gray-600">
                    {application.status}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 flex items-center mb-2">
                <FaBuilding className="mr-2 text-blue-500" />{' '}
                {application.company}
              </p>
              <p className="text-gray-500 flex items-center mb-2">
                <FaMapMarkerAlt className="mr-2 text-blue-500" />{' '}
                {application.location}
              </p>
              <p className="text-gray-500 flex items-center mb-4">
                <FaClock className="mr-2 text-blue-500" /> Applied on{' '}
                {application.appliedDate}
              </p>
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                View Details
              </button>
            </div>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">
              No applications found for this status.
            </p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
              Browse Jobs
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default YourApplications;
