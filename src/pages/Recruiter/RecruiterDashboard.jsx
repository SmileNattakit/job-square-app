import React, { useState, useEffect, useCallback } from 'react';
import { FaEdit, FaTrash, FaUsers, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import JobForm from '../../components/Recruiter/JobForm';
import { authenticatedAxios } from '../../services/axiosInstances';
import { useAtom } from 'jotai';
import { authAtom } from '../../atoms/authAtom';
import Swal from 'sweetalert2';

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [authState] = useAtom(authAtom);

  const recruiterId = authState.user ? authState.user.userId : null;

  const fetchJobs = useCallback(async () => {
    if (!recruiterId) return;
    try {
      setIsLoading(true);
      const response = await authenticatedAxios.get(
        `/jobs/recruiter/${recruiterId}/jobs`
      );
      setJobs(response.data);
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
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(jobId);
      }
    });
  };

  const handleJobSubmit = async (jobData) => {
    console.log('handleJobSubmit called with data:', jobData); // Add this log
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
      console.error(
        'Error in handleJobSubmit:',
        error.response || error.message
      ); // Add this log
      toast.error('Failed to submit job');
    }
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
                                onClick={() => confirmDelete(job._id)}
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
