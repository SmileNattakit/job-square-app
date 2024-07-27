import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const JobForm = ({ job, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [tags, setTags] = useState(job?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (job) {
      Object.keys(job).forEach((key) => {
        setValue(key, job[key]);
      });
      setTags(job.tags || []);
    }
  }, [job, setValue]);

  const handleFormSubmit = (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const requirements =
      typeof data.requirements === 'string'
        ? data.requirements.split('\n')
        : data.requirements;

    const formData = {
      ...data,
      salary: parseInt(data.salary, 10),
      tags,
      requirements,
    };

    onSubmit(formData);
    setIsSubmitting(false);
  };

  const addTag = () => {
    if (newTag.trim() !== '' && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-gray-100 p-6 rounded-lg shadow-lg space-y-6"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Job Title
        </label>
        <input
          type="text"
          id="title"
          {...register('title', { required: 'Job title is required' })}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          {...register('location', { required: 'Location is required' })}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="type"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Job Type
        </label>
        <select
          id="type"
          {...register('type', { required: 'Job type is required' })}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select job type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="salary"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Salary
        </label>
        <input
          type="number"
          id="salary"
          {...register('salary', {
            required: 'Salary is required',
            min: { value: 0, message: 'Salary must be positive' },
          })}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.salary && (
          <p className="mt-1 text-sm text-red-600">{errors.salary.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Category
        </label>
        <select
          id="category"
          {...register('category', { required: 'Category is required' })}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select category</option>
          <option value="Software">Software</option>
          <option value="Design">Design</option>
          <option value="Data">Data</option>
          <option value="Hardware">Hardware</option>
          <option value="Content">Content</option>
          <option value="Engineering">Engineering</option>
          <option value="Other">Other</option>
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Tags
        </label>
        <div className="flex mt-1">
          <input
            type="text"
            id="tags"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-grow px-3 py-2 bg-white border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            disabled={isSubmitting}
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 inline-flex items-center justify-center w-4 h-4 text-blue-400 hover:bg-blue-200 hover:text-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={isSubmitting}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
          rows={4}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="requirements"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Requirements
        </label>
        <textarea
          id="requirements"
          {...register('requirements', {
            required: 'Requirements are required',
          })}
          rows={4}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          Enter each requirement on a new line
        </p>
        {errors.requirements && (
          <p className="mt-1 text-sm text-red-600">
            {errors.requirements.message}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : job ? 'Update Job' : 'Create Job'}
        </button>
      </div>
    </form>
  );
};

export default JobForm;
