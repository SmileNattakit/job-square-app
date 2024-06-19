import JobCard from './JobCard';
import { useEffect, useState, useRef } from 'react';

const JobListing = () => {
  const jobs = [
    {
      id: 1,
      datePosted: '15 Jun, 2024',
      company: 'Google',
      companyInitial: 'G',
      title: 'Software Engineer',
      tags: ['Full time', 'Mid level', 'On-site', 'Software development'],
      salary: 35000,
      location: 'Mountain View, CA',
    },
    {
      id: 2,
      datePosted: '12 Jun, 2024',
      company: 'Facebook',
      companyInitial: 'f',
      title: 'Product Designer',
      tags: ['Full time', 'Senior level', 'Hybrid', 'Design'],
      salary: 30000,
      location: 'Menlo Park, CA',
    },
    {
      id: 3,
      datePosted: '05 Jun, 2024',
      company: 'Microsoft',
      companyInitial: 'M',
      title: 'Data Scientist',
      tags: ['Full time', 'Entry level', 'On-site', 'Data science'],
      salary: 60000,
      location: 'Redmond, WA',
    },
    {
      id: 4,
      datePosted: '28 May, 2024',
      company: 'Apple',
      companyInitial: 'A',
      title: 'Hardware Engineer',
      tags: ['Full time', 'Senior level', 'On-site', 'Hardware development'],
      salary: 35000,
      location: 'Cupertino, CA',
    },
    {
      id: 5,
      datePosted: '20 May, 2024',
      company: 'Netflix',
      companyInitial: 'N',
      title: 'Content Writer',
      tags: ['Part time', 'Mid level', 'Distant', 'Writing'],
      salary: 25000,
      location: 'Los Gatos, CA',
    },
    {
      id: 6,
      datePosted: '10 May, 2024',
      company: 'Tesla',
      companyInitial: 'T',
      title: 'Mechanical Engineer',
      tags: ['Full time', 'Senior level', 'On-site', 'Engineering'],
      salary: 45000,
      location: 'Austin, TX',
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center md:px-[15%]">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobListing;
