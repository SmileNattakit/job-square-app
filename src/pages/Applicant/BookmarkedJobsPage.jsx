import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
  FaBookmark,
  FaTrash,
} from 'react-icons/fa';

const BookmarkedJobsPage = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const loadSavedJobs = () => {
      const savedJobIds = JSON.parse(
        localStorage.getItem('bookmarkedJobs') || '[]'
      );
      // ในสถานการณ์จริง คุณควรโหลดข้อมูลงานจาก API หรือ store ของคุณ
      // นี่เป็นเพียงตัวอย่างที่ใช้ข้อมูลจำลอง
      const mockJobs = [
        {
          id: 1,
          title: 'Senior Software Engineer',
          company: 'Tech Innovators Inc.',
          location: 'San Francisco, CA',
          salary: '$120,000 - $160,000',
          type: 'Full-time',
          datePosted: '2023-06-15',
        },
        {
          id: 2,
          title: 'UX/UI Designer',
          company: 'Creative Designs Co.',
          location: 'New York, NY',
          salary: '$80,000 - $110,000',
          type: 'Contract',
          datePosted: '2023-06-18',
        },
        {
          id: 3,
          title: 'Data Scientist',
          company: 'Data Insights Ltd.',
          location: 'Chicago, IL',
          salary: '$100,000 - $140,000',
          type: 'Full-time',
          datePosted: '2023-06-20',
        },
      ];
      const filteredJobs = mockJobs.filter((job) =>
        savedJobIds.includes(job.id)
      );
      setSavedJobs(filteredJobs);
    };

    loadSavedJobs();
  }, []);

  const removeJob = (id) => {
    const updatedJobs = savedJobs.filter((job) => job.id !== id);
    setSavedJobs(updatedJobs);
    const updatedJobIds = updatedJobs.map((job) => job.id);
    localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedJobIds));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Saved Jobs</h2>

        {savedJobs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 relative"
              >
                <button
                  onClick={() => removeJob(job.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition duration-300"
                >
                  <FaTrash />
                </button>
                <Link to={`/job-listings/${job.id}`} className="block">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 flex items-center mb-2">
                    <FaBuilding className="mr-2 text-blue-500" /> {job.company}
                  </p>
                  <p className="text-gray-500 flex items-center mb-2">
                    <FaMapMarkerAlt className="mr-2 text-blue-500" />{' '}
                    {job.location}
                  </p>
                  <p className="text-gray-500 flex items-center mb-2">
                    <FaDollarSign className="mr-2 text-blue-500" /> {job.salary}
                  </p>
                  <p className="text-gray-500 flex items-center mb-2">
                    <FaBriefcase className="mr-2 text-blue-500" /> {job.type}
                  </p>
                  <p className="text-gray-500 flex items-center mb-4">
                    <FaClock className="mr-2 text-blue-500" /> Posted on{' '}
                    {job.datePosted}
                  </p>
                </Link>
                <Link
                  to={`/job-listings/${job.id}`}
                  className="inline-block w-full text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FaBookmark className="text-gray-400 text-5xl mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-4">
              You haven't saved any jobs yet.
            </p>
            <Link
              to="/job-listings"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Browse Jobs
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default BookmarkedJobsPage;
