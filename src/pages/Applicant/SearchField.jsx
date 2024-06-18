import React, { useState } from 'react';

const SearchField = () => {
  return (
    <div className="flex min-h-screen bg-base-200 justify-center items-start">
      <div className="w-screen px-6 py-10">
        <div className="w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold ">
            Find your next career today
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold">
            within minutes.
          </h2>
          <p className="py-6 text-base md:text-lg lg:text-xl">
            Introducing our cutting-edge UI Kit, a game-changer for designers
            and developers alike!
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="Design"
              className="input input-bordered w-full pr-16"
            />
            <button className="btn bg-blue-500 text-white absolute top-0 right-0 rounded-l-none">
              Search
            </button>
          </div>
          <div className=" gap-2 grid md:flex">
            {/* job category */}
            <div className="flex gap-2">
              {' '}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text ">JOB CATEGORY</span>
                </div>
                <select className="select select-bordered">
                  <option disabled selected>
                    Select a category
                  </option>
                  <option>Developer</option>
                  <option>Hospitality</option>
                </select>
              </label>
              {/* job type */}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text ">JOB TYPE</span>
                </div>
                <select className="select select-bordered">
                  <option disabled selected>
                    Select a type
                  </option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Freelance</option>
                </select>
              </label>
            </div>
            {/* salary range */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text ">SALARY RANGE</span>
              </div>
              <select className="select select-bordered">
                <option value="" disabled selected>
                  Select a range
                </option>
                <option value="0-20000">0-20,000 ฿</option>
                <option value="20001-50000">20,001-50,000 ฿</option>
                <option value="50001-80000">50,001-80,000 ฿</option>
                <option value="80001-999999">80,001+ ฿</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchField;
