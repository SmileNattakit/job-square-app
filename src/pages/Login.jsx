import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login to you account</h2>

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
            type="password"
            placeholder="Password"
            className="input input-bordered"
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <Link to="/applicant-dashboard">
          <button className="btn bg-blue-500 text-white w-full mt-4">
            Login
          </button>
        </Link>

        <p className="text-center mt-2">
          <span>Don't have an account yet? </span>
          <a href="#" className="link link-hover font-semibold">
            <span>Register now!</span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
