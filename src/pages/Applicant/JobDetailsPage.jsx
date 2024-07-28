import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FaChevronLeft,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaTag,
  FaClock,
  FaUpload,
  FaTimes,
  FaDownload,
  FaTrash,
} from 'react-icons/fa';
import { authenticatedAxios } from '../../services/axiosInstances';
import { useAtom } from 'jotai';
import { authAtom } from '../../atoms/authAtom';
import toast from 'react-hot-toast';

const JobDetailPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [auth] = useAtom(authAtom);
  const [job, setJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [existingCvUrl, setExistingCvUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [interest, setInterest] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await authenticatedAxios.get(`/jobs/${jobId}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
        navigate('/job-listings');
      }
    };
    fetchJobDetails();
  }, [jobId, navigate]);

  useEffect(() => {
    const fetchTalentData = async () => {
      try {
        const response = await authenticatedAxios.get(
          `/talents/${auth.user.userId}`
        );
        const data = response.data;
        if (data.cvFile) {
          setExistingCvUrl(data.cvFile);
        }
      } catch (error) {
        console.error('Error fetching talent data:', error);
        toast.error('Failed to load CV data');
      }
    };
    if (auth.user && auth.user.userId) {
      fetchTalentData();
    }
  }, [auth.user]);

  const handleApply = () => {
    if (!auth.user) {
      navigate('/login', { state: { from: `/job-listings/${jobId}` } });
      return;
    }
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 5 * 1024 * 1024) {
      setFile(selectedFile);
    } else {
      toast.error('File size exceeds 5MB limit');
    }
  };

  const handleRemoveExistingCv = () => {
    setExistingCvUrl(null);
  };

  const handleDownloadCV = () => {
    try {
      if (!existingCvUrl) {
        toast.error('No CV file available');
        return;
      }
      window.open(existingCvUrl, '_blank');
    } catch (error) {
      console.error('Error downloading CV:', error);
      toast.error('Failed to download CV');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const applicationData = {
        jobId: jobId,
        talentId: auth.user.userId,
        interest: interest,
        coverLetter: coverLetter,
      };

      await authenticatedAxios.post('/applications/apply', applicationData);

      toast.success('Application submitted successfully!');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('An error occurred while submitting the application');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <FaChevronLeft className="mr-2" /> Back to Job Listings
        </Link>
        <div className="bg-white rounded-lg shadow-lg p-8">
          {job.recruiterId.banner && (
            <div
              className="w-full h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${job.recruiterId.banner})` }}
            ></div>
          )}
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
            <button
              onClick={handleApply}
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Apply Now
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <InfoItem icon={FaMapMarkerAlt} text={job.location} />
            <InfoItem icon={FaBriefcase} text={job.type} />
            <InfoItem
              icon={FaMoneyBillWave}
              text={`${job.salary.toLocaleString()} THB`}
            />
            <InfoItem icon={FaTag} text={job.category} />
          </div>
          <div className="bg-blue-50 p-4 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              Job Description
            </h2>
            <p className="text-gray-700">{job.description}</p>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              Requirements
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
              Required Skills
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
              Posted on: {new Date(job.posted).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-800">
                Apply for: {job.title}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-blue-700 mb-2">
                  Why are you interested in working at{' '}
                  {job.recruiterId.companyName}?
                </label>
                <textarea
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  placeholder={`Describe your interest in ${job.recruiterId.companyName}. Why are you a good fit for this role?`}
                  required
                ></textarea>
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-700 mb-2">CV</p>
                {existingCvUrl ? (
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={handleDownloadCV}
                      className="text-blue-500 hover:underline flex items-center"
                    >
                      <FaDownload className="mr-2" />
                      Download Existing CV
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveExistingCv}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      id="cv-upload"
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                    />
                    <label
                      htmlFor="cv-upload"
                      className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition duration-300 inline-block"
                    >
                      <FaUpload className="mr-2" /> Choose File
                    </label>
                    <p className="text-sm text-blue-500 mt-2">
                      {file ? file.name : 'No file chosen'}
                    </p>
                    <p className="text-xs text-blue-400">
                      PDF, DOC, DOCX files only, max 5MB
                    </p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-700 mb-2">
                  Cover Letter (Optional)
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="6"
                  placeholder="Add your cover letter here"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-full w-full hover:bg-blue-700 transition duration-300 text-lg font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? 'Submitting Application...'
                  : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      )}
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
