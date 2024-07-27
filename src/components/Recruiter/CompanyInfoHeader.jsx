import React, { useState, useEffect } from 'react';
import { FaBuilding, FaMapMarkerAlt, FaUsers, FaSpinner } from 'react-icons/fa';
import { authenticatedAxios } from '../../services/axiosInstances';
import toast from 'react-hot-toast';
import { useAtom } from 'jotai';
import { authAtom } from '../../atoms/authAtom';

const CompanyInfoHeader = () => {
  const [companyData, setCompanyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authState] = useAtom(authAtom);
  const recruiterId = authState.user ? authState.user.userId : null;

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!recruiterId) {
        console.error('No recruiter ID available');
        setIsLoading(false);
        return;
      }

      try {
        const response = await authenticatedAxios.get(`/recruiters/${recruiterId}`);
        setCompanyData(response.data);
      } catch (error) {
        console.error('Error fetching company data:', error);
        if (error.response && error.response.status === 404) {
          toast.error('Company profile not found. Please complete your profile first.');
        } else {
          toast.error('Failed to load company profile. Please try again later.');
        }
        setCompanyData({
          companyName: 'Company Name Not Available',
          location: 'Location Not Available',
          companySize: 'Company Size Not Available'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, [recruiterId]);

  if (isLoading) {
    return (
      <div className="bg-blue-600 text-white p-6 flex items-center justify-center">
        <FaSpinner className="animate-spin mr-2" />
        <span>Loading company data...</span>
      </div>
    );
  }

  if (!companyData) {
    return (
      <div className="bg-blue-600 text-white p-6">
        <p>Company data not available. Please complete your profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-600 text-white p-6">
      <div className="flex items-center space-x-4">
        {companyData.logo && (
          <img src={companyData.logo} alt="Company Logo" className="w-16 h-16 rounded-full object-cover" />
        )}
        <div>
          <h2 className="text-2xl font-bold">{companyData.companyName}</h2>
          <div className="flex items-center mt-2">
            <FaMapMarkerAlt className="mr-2" />
            <span>{companyData.location}</span>
          </div>
          <div className="flex items-center mt-1">
            <FaUsers className="mr-2" />
            <span>{companyData.companySize}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoHeader;
