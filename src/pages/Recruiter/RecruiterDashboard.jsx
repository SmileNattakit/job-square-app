import React, { useState, useEffect, useCallback } from 'react';
import { FaEdit, FaTrash, FaUsers, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import JobForm from '../../components/Recruiter/JobForm';
import { authenticatedAxios } from '../../services/axiosInstances';
import { useAtom } from 'jotai';
import { authAtom } from '../../atoms/authAtom';
import Swal from 'sweetalert2';
import ApplicantsModal from '../../components/Recruiter/ApplicantsModal';

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [authState] = useAtom(authAtom);

  const recruiterId = authState.user ? authState.user.userId : null;

  const fetchJobs = useCallback(async () => {
    if (!recruiterId) return;
    try {
      setIsLoading(true);
      const response = await authenticatedAxios.get(
        `/jobs/recruiter/${recruiterId}/jobs`
      );
      const jobsData = await Promise.all(
        response.data.map(async (job) => {
          const applicantsResponse = await authenticatedAxios.get(
            `/applications/${job._id}`
          );
          const applicants = applicantsResponse.data;
          const pendingCount = applicants.filter(
            (app) => app.status === 'Pending'
          ).length;
          return {
            ...job,
            applicantsCount: applicants.length,
            pendingCount: pendingCount,
          };
        })
      );
      setJobs(jobsData);
    } catch (error) {
      toast.error('Failed to load jobs');
    } finally {
      setIsLoading(false);
    }
  }, [recruiterId]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleCreateJob = () => {
    setEditingJob(null);
    setShowJobForm(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowJobForm(true);
  };

  const handleDelete = async (jobId) => {
    try {
      await authenticatedAxios.delete(`/jobs/${jobId}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      toast.success('Job deleted successfully');
    } catch (error) {
      toast.error('Failed to delete job');
    }
  };

  const confirmDelete = (jobId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this job?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(jobId);
      }
    });
  };

  const handleJobSubmit = async (jobData) => {
    try {
      if (editingJob) {
        const response = await authenticatedAxios.patch(
          `/jobs/${editingJob._id}`,
          jobData
        );
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === editingJob._id ? response.data : job
          )
        );
        toast.success('Job updated successfully');
      } else {
        const newJobData = { ...jobData, recruiterId };
        const response = await authenticatedAxios.post('/jobs', newJobData);
        setJobs((prevJobs) => [...prevJobs, response.data]);
        toast.success('Job created successfully');
      }
      setShowJobForm(false);
      setEditingJob(null);
    } catch (error) {
      toast.error('Failed to submit job');
    }
  };

  const handleViewApplicants = (job) => {
    setSelectedJob(job);
    setShowApplicantsModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">
          Recruiter Dashboard
        </h1>

        {showJobForm ? (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 transition-all duration-300 ease-in-out transform hover:shadow-xl">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-6">
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
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-xl">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-blue-800">
                  Your Job Listings
                </h2>
                <button
                  onClick={handleCreateJob}
                  className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
                >
                  <FaPlus className="mr-2" /> Create Job
                </button>
              </div>

              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : jobs.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No jobs posted yet.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr className="bg-blue-50">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">
                          Job Title
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">
                          Location
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">
                          Salary
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">
                          Applicants
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map((job) => (
                        <tr
                          key={job._id}
                          className="border-b border-blue-100 hover:bg-blue-50 transition-colors duration-200"
                        >
                          <td className="px-4 py-3">{job.title}</td>
                          <td className="px-4 py-3">{job.location}</td>
                          <td className="px-4 py-3">{job.type}</td>
                          <td className="px-4 py-3">
                            ${job.salary.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleViewApplicants(job)}
                              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                            >
                              <FaUsers className="mr-2" />
                              {job.applicantsCount || 0}
                              {job.pendingCount > 0 && (
                                <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                  {job.pendingCount} new
                                </span>
                              )}
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditJob(job)}
                                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => confirmDelete(job._id)}
                                className="text-red-600 hover:text-red-800 transition-colors duration-200"
                              >
                                <FaTrash />
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

        {showApplicantsModal && (
          <ApplicantsModal
            job={selectedJob}
            onClose={() => setShowApplicantsModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
