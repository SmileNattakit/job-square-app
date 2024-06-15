import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Register = () => {
  const [accountType, setAccountType] = useState('Applicant');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">
          Create a new account as...
        </h2>

        <div className="btn-group mb-4">
          <button
            className={`btn ${
              accountType === 'Applicant'
                ? 'btn-active  bg-blue-500 text-white'
                : ''
            }`}
            onClick={() => setAccountType('Applicant')}
          >
            Applicant
          </button>
          <button
            className={`btn ${
              accountType === 'Recruiter'
                ? 'btn-active bg-blue-500 text-white'
                : ''
            }`}
            onClick={() => setAccountType('Recruiter')}
          >
            Recruiter
          </button>
        </div>

        {accountType === 'Applicant' && (
          <>
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Company Name"
                className="input input-bordered"
              />
            </div>
          </>
        )}

        {accountType === 'Recruiter' && (
          <>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Company Name</span>
              </label>
              <input
                type="text"
                placeholder="Company Name"
                className="input input-bordered"
              />
            </div>
          </>
        )}

        <div className="form-control">
          {' '}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="example@example.com"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="text"
              placeholder="Agency Name"
              className="input input-bordered"
            />
          </div>
          <label className="label">
            <span className="label-text">Password Confirmation</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered"
          />
        </div>

        <button className="btn bg-blue-500 text-white w-full mt-4">
          Create an Account
        </button>

        <p className="text-center mt-2">
          Already have an account?
          <Link to="/login">
            <span className="link link-hover font-semibold"> Log in</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
