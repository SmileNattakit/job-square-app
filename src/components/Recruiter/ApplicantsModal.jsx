import React, { useEffect, useState } from 'react';
import {
  FaTimes,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaSpinner,
} from 'react-icons/fa';
import { authenticatedAxios } from '../../services/axiosInstances';

const ApplicantsModal = ({ job, onClose }) => {
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await authenticatedAxios.get(
          `/applications/${job._id}`
        );
        setApplicants(response.data);
      } catch (error) {
        console.error('Failed to fetch applicants', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (job) {
      fetchApplicants();
    }
  }, [job]);

  const updateApplicantStatus = async (applicantId, status) => {
    try {
      const response = await authenticatedAxios.patch(
        `/applications/${applicantId}`,
        { status }
      );
      setApplicants(
        applicants.map((applicant) =>
          applicant._id === applicantId
            ? { ...applicant, status: response.data.status }
            : applicant
        )
      );
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Reviewed':
        return 'text-yellow-500';
      case 'Accepted':
        return 'text-green-500';
      case 'Rejected':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Reviewed':
        return <FaSpinner className="animate-spin" />;
      case 'Accepted':
        return <FaCheckCircle />;
      case 'Rejected':
        return <FaTimesCircle />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-blue-50">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-blue-800">
              Applicants for {job.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 rounded-full hover:bg-blue-100"
            >
              <FaTimes size={24} />
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : applicants.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No applicants yet.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {applicants.map((applicant) => (
                <li key={applicant._id} className="py-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-grow">
                      <p className="text-xl font-medium text-blue-800">
                        {applicant.talentId.firstName}{' '}
                        {applicant.talentId.lastName}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {applicant.talentId.email}
                      </p>
                      <p className="text-sm text-gray-600">
                        Phone: {applicant.talentId.phoneNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        Applied:{' '}
                        {new Date(applicant.appliedAt).toLocaleString()}
                      </p>
                      <p className="mt-2 text-gray-700">{applicant.interest}</p>
                    </div>
                    <div className="flex flex-col items-end ml-4">
                      <a
                        href={applicant.talentId.cvFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-2"
                      >
                        <FaEye className="mr-2" /> View Resume
                      </a>
                      <div
                        className={`flex items-center font-medium ${getStatusColor(
                          applicant.status
                        )}`}
                      >
                        {getStatusIcon(applicant.status)}
                        <span className="ml-2">
                          Status: {applicant.status || 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() =>
                        updateApplicantStatus(applicant._id, 'Reviewed')
                      }
                      className={`btn btn-sm ${
                        applicant.status === 'Reviewed'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-white text-yellow-500 border-yellow-500'
                      } hover:bg-yellow-600 hover:text-white transition-colors duration-200`}
                    >
                      Reviewed
                    </button>
                    <button
                      onClick={() =>
                        updateApplicantStatus(applicant._id, 'Accepted')
                      }
                      className={`btn btn-sm ${
                        applicant.status === 'Accepted'
                          ? 'bg-green-500 text-white'
                          : 'bg-white text-green-500 border-green-500'
                      } hover:bg-green-600 hover:text-white transition-colors duration-200`}
                    >
                      Accepted
                    </button>
                    <button
                      onClick={() =>
                        updateApplicantStatus(applicant._id, 'Rejected')
                      }
                      className={`btn btn-sm ${
                        applicant.status === 'Rejected'
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-red-500 border-red-500'
                      } hover:bg-red-600 hover:text-white transition-colors duration-200`}
                    >
                      Rejected
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantsModal;
