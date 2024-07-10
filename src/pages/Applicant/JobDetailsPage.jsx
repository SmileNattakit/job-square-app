import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaChevronLeft,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaTag,
  FaBookmark,
  FaShare,
  FaClock,
} from 'react-icons/fa';

const JobDetailPage = () => {
  const { jobId } = useParams();
  const location = useLocation();
  const [job, setJob] = useState(location.state?.job || null);
  const navigate = useNavigate();

  useEffect(() => {
    // If job data is not passed through state, fetch it using jobId
    if (!job) {
      const fetchJobDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/jobs/${jobId}`
          );
          setJob(response.data);
        } catch (error) {
          console.error('Error fetching job details:', error);
          // Handle error, e.g., redirect to job listings
          navigate('/job-listings');
        }
      };
      fetchJobDetails();
    }
  }, [jobId, job, navigate]);

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/job-listings"
          className="text-blue-600 hover:text-blue-800 flex items-center mb-6"
        >
          <FaChevronLeft className="mr-2" /> กลับไปยังรายการงาน
        </Link>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
              <img
                src={job.recruiterId.logo}
                alt={job.recruiterId.name}
                className="w-20 h-20 object-contain mr-6 rounded-full shadow"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {job.title}
                </h1>
                <div>
                  <h2 className="text-xl text-blue-600 mb-1">
                    {job.recruiterId.companyName}
                  </h2>
                  <a
                    href={job.recruiterId.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                  >
                    {job.recruiterId.website}
                  </a>
                </div>
              </div>
            </div>
            {/* <div className="flex space-x-4">
              <button className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200">
                <FaBookmark />
              </button>
              <button className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200">
                <FaShare />
              </button>
            </div> */}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <InfoItem icon={FaMapMarkerAlt} text={job.location} />
            <InfoItem icon={FaBriefcase} text={job.type} />
            <InfoItem icon={FaMoneyBillWave} text={job.salary} />
            <InfoItem icon={FaTag} text={job.category} />
          </div>
          <div className="bg-blue-50 p-4 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              รายละเอียดงาน
            </h2>
            <p className="text-gray-700">{job.description}</p>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              คุณสมบัติที่ต้องการ
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              {job.requirements.map((req, index) => (
                <li key={index} className="mb-2">
                  {req}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              ทักษะที่ต้องการ
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-500 text-sm flex items-center">
              <FaClock className="mr-2" />
              วันที่ลงประกาศ: {new Date(job.posted).toLocaleDateString()}
            </div>
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
              onClick={() =>
                navigate(`/job-listings/${job._id}/apply`, { state: { job } })
              }
            >
              สมัครงาน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon: Icon, text }) => (
  <div className="flex items-center bg-blue-50 p-3 rounded-lg">
    <Icon className="text-blue-500 mr-3" />
    <span className="text-gray-700">{text}</span>
  </div>
);

export default JobDetailPage;
