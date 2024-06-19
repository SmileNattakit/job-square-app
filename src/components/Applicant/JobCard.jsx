import React from 'react';

function JobCard({ job }) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl h-80">
      <div className="card-body">
        <div className="card-title flex justify-between">
          <span className="text-sm">{job.datePosted}</span>
          <button class="btn btn-circle btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>
        <h2 className="card-title font-bold">
          {job.company}
          <div className="badge badge-secondary">{job.companyInitial}</div>
        </h2>
        <p className="text-xl">{job.title}</p>
        <div className="card-actions justify-start mt-2 gap-2">
          {job.tags.map((tag) => (
            <div key={tag} className="badge badge-outline">
              {tag}
            </div>
          ))}
        </div>
        <div className="card-actions justify-between mt-4">
          <div className="text-lg font-bold">
            ฿{job.salary.toLocaleString()}/month
            <br />
            <span className="text-sm">{job.location}</span>
          </div>
          <button className="btn btn-primary">Details</button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
