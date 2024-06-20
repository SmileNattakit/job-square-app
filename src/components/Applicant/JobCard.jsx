import React from 'react';

function JobCard({ job }) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="mx-2 my-2">
        <div className="bg-blue-100 p-2 rounded-2xl ">
          <div className="card-title flex justify-between mb-2">
            <span className="text-sm bg-white p-2 rounded-full">
              {job.datePosted}
            </span>
            <button class="btn btn-circle ">
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
          <div className="card-title font-bold flex justify-between">
            {job.company}
            <div className="avatar">
              <div className="w-8 rounded-full ring  ring-offset-base-100 ring-offset-2 mr-2">
                <img src={job.companyLogo} />
              </div>
            </div>
          </div>
          <p className="text-xl">{job.title}</p>
          <div className="card-actions justify-start mt-2 gap-2 h-16">
            {job.tags.map((tag) => (
              <div key={tag} className="badge badge-outline">
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className="card-actions justify-between mt-4 px-6">
          <div className="text-lg font-bold">
            ฿{job.salary.toLocaleString()}/month
            <br />
            <span className="text-sm">
              {job.location[0].district}, {job.location[0].province}
            </span>
          </div>
          <button className="btn btn-outline bg-black text-white btn-sm rounded-full">
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
