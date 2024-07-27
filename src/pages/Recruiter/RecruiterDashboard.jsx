import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaUsers, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import JobForm from '../../components/Recruiter/JobForm';

// Mock data
const mockJobs = [
  {
    _id: '668c372433229c80e105bf47',
    title: 'Full Stack Developer',
    recruiterId: '668c35e97ece7cebb85b6f5d',
    location: 'Bangkok, Thailand',
    type: 'Full-time',
    salary: 80000,
    category: 'Software',
    tags: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    description:
      'We are seeking a talented Full Stack Developer to join our dynamic team. The ideal candidate will have experience with both front-end and back-end development, and a passion for creating efficient, scalable web applications.',
    requirements: [
      '3+ years of experience in full stack development',
      'Proficiency in JavaScript, React, Node.js, and MongoDB',
      'Experience with RESTful API design and implementation',
      'Strong problem-solving skills and attention to detail',
    ],
    posted: '2024-07-08T18:59:48.159Z',
    applicantsCount: 5,
  },
  // Add more mock jobs here if needed
];

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    // Simulate API call with setTimeout
    setTimeout(() => {
      setJobs(mockJobs);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCreateJob = () => {
    setEditingJob(null);
    setShowJobForm(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowJobForm(true);
  };

  const handleDelete = (jobId) => {
    setJobs(jobs.filter((job) => job._id !== jobId));
    toast.success('Job deleted successfully');
  };

  const handleJobSubmit = (jobData) => {
    if (editingJob) {
      // Update existing job
      setJobs(
        jobs.map((job) =>
          job._id === editingJob._id ? { ...job, ...jobData } : job
        )
      );
      toast.success('Job updated successfully');
    } else {
      // Create new job
      const newJob = {
        _id: Date.now().toString(), // Temporary ID
        ...jobData,
        recruiterId: 'current-recruiter-id', // Replace with actual recruiter ID
        posted: new Date().toISOString(),
        applicantsCount: 0,
      };
      setJobs([...jobs, newJob]);
      toast.success('Job created successfully');
    }
    setShowJobForm(false);
    setEditingJob(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-8">
          Recruiter Dashboard
        </h1>

        {showJobForm ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {editingJob ? 'Edit Job' : 'Create New Job'}
              </h2>
              <JobForm
                job={editingJob}
                onSubmit={handleJobSubmit}
                onCancel={() => {
                  setShowJobForm(false);
                  setEditingJob(null);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Your Job Listings
                </h2>
                <button onClick={handleCreateJob} className="btn btn-primary">
                  <FaPlus className="mr-2" /> Create Job
                </button>
              </div>

              {isLoading ? (
                <div className="text-center">
                  <div className="loading loading-spinner loading-lg"></div>
                </div>
              ) : jobs.length === 0 ? (
                <p className="text-center text-gray-500">No jobs posted yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>Job Title</th>
                        <th>Location</th>
                        <th>Type</th>
                        <th>Salary</th>
                        <th>Applicants</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map((job) => (
                        <tr key={job._id}>
                          <td>{job.title}</td>
                          <td>{job.location}</td>
                          <td>{job.type}</td>
                          <td>${job.salary.toLocaleString()}</td>
                          <td>
                            <div className="flex items-center">
                              <FaUsers className="mr-2 text-blue-500" />
                              {job.applicantsCount}
                            </div>
                          </td>
                          <td>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditJob(job)}
                                className="btn btn-sm btn-ghost"
                              >
                                <FaEdit className="text-blue-500" />
                              </button>
                              <button
                                onClick={() => handleDelete(job._id)}
                                className="btn btn-sm btn-ghost"
                              >
                                <FaTrash className="text-red-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
