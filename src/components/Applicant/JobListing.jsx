import JobCard from './JobCard';
import { useEffect, useState, useRef } from 'react';

const JobListing = () => {
  const jobs = [
    {
      jobId: 1,
      datePosted: '15 Jun, 2024',
      company: 'Google',
      companyLogo: '/public/Company logo/google.jpg',
      companyInitial: 'G',
      title: 'Software Engineer',
      tags: ['Full time', 'On-site', 'Software development'],
      salary: 35000,
      location: [{ province: 'Bangkok', district: 'Chatuchak' }],
    },
    {
      jobId: 2,
      datePosted: '12 Jun, 2024',
      company: 'Facebook',
      companyLogo: '/public/Company logo/google.jpg',
      title: 'Product Designer',
      tags: ['Full time', 'Senior level', 'Hybrid', 'Design'],
      salary: 30000,
      location: [{ province: 'Bangkok', district: 'Chatuchak' }],
    },
    {
      jobId: 3,
      datePosted: '05 Jun, 2024',
      company: 'Microsoft',
      companyLogo: '/public/Company logo/google.jpg',
      title: 'Data Scientist',
      tags: ['Full time', 'Entry level', 'On-site'],
      salary: 60000,
      location: [{ province: 'Bangkok', district: 'Chatuchak' }],
    },
    {
      jobId: 4,
      datePosted: '28 May, 2024',
      company: 'Apple',
      companyLogo: '/public/Company logo/google.jpg',
      title: 'Hardware Engineer',
      tags: ['Full time', 'Senior level', 'On-site'],
      salary: 35000,
      location: [{ province: 'Bangkok', district: 'Chatuchak' }],
    },
    {
      jobId: 5,
      datePosted: '20 May, 2024',
      company: 'Netflix',
      companyLogo: '/public/Company logo/google.jpg',
      title: 'Content Writer',
      tags: ['Part time', 'Mid level', 'Distant', 'Writing'],
      salary: 25000,
      location: [{ province: 'Bangkok', district: 'Chatuchak' }],
    },
    {
      jobId: 6,
      datePosted: '10 May, 2024',
      company: 'Tesla',
      companyLogo: '/public/Company logo/google.jpg',
      title: 'Mechanical Engineer',
      tags: ['Full time', 'Senior level', 'On-site'],
      salary: 45000,
      location: [{ province: 'Bangkok', district: 'Chatuchak' }],
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center md:px-[15%] pb-10">
      {jobs.map((job) => (
        <JobCard key={job.jobId} job={job} />
      ))}
    </div>
  );
};

export default JobListing;
