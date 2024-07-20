import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import toast from 'react-hot-toast';
import TalentsForm from '../components/Main/Register/TalentsForm';
import RecruiterForm from '../components/Main/Register/RecruiterForm';
import { guestAxios } from '../services/axiosInstances';
import useLogin from '../hooks/useLogin';

const RegisterPage = () => {
  const [accountType, setAccountType] = useState('Talents');
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch('password');
  const navigate = useNavigate();
  const { login } = useLogin();

  const onSubmit = async (data) => {
    try {
      const url = accountType === 'Talents' ? '/talents' : '/recruiters';
      const response = await guestAxios.post(url, data);

      if (response.status === 201) {
        toast.success('Registration successful!');

        // Automatic login
        await login(data.email, data.password, accountType);

        // Navigate to home page
        navigate('/');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred during registration.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">
          JobSquare
        </h2>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Create a new account
        </h3>

        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded-l-lg ${
              accountType === 'Talents'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setAccountType('Talents')}
          >
            Talents
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${
              accountType === 'Recruiter'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setAccountType('Recruiter')}
          >
            Recruiter
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {accountType === 'Talents' ? (
            <TalentsForm register={register} errors={errors} />
          ) : (
            <RecruiterForm register={register} errors={errors} />
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaEnvelope className="text-gray-500" />
              </span>
              <input
                type="email"
                id="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="example@example.com"
                className={`w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="text-gray-500" />
              </span>
              <input
                type="password"
                id="password"
                {...register('password', { required: 'Password is required' })}
                placeholder="••••••••"
                className={`w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 ${
                  errors.password ? 'border-red-500' : ''
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="text-gray-500" />
              </span>
              <input
                type="password"
                id="confirmPassword"
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
                placeholder="••••••••"
                className={`w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 ${
                  errors.confirmPassword ? 'border-red-500' : ''
                }`}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
