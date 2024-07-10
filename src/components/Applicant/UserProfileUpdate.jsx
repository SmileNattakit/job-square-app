import React from 'react';
import { useForm } from 'react-hook-form';

const UserProfileUpdate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: 'John Doe',
      jobTitle: 'Software Developer',
      email: 'email@email.com',
      phone: '+66123456789',
      address: 'Phaholyothin Road, Senanikom, Chatuchak, Bangkok 10900',
    },
  });

  const onSubmit = (data) => {
    console.log(data); // Replace with actual submission logic
  };

  const formFields = [
    { id: 'name', label: 'Name', type: 'text' },
    { id: 'jobTitle', label: 'Job Title', type: 'text' },
    { id: 'email', label: 'Email', type: 'email' },
    { id: 'phone', label: 'Phone', type: 'tel' },
    { id: 'address', label: 'Address', type: 'textarea' }, // เปลี่ยนเป็น textarea
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Update Profile</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {formFields.map((field) => (
            <div key={field.id} className="mb-4">
              <label
                htmlFor={field.id}
                className="block text-gray-700 font-medium mb-2"
              >
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  {...register(field.id)}
                  id={field.id}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 ${
                    errors[field.id] ? 'border-red-500' : ''
                  }`}
                />
              ) : (
                <input
                  {...register(field.id)}
                  type={field.type}
                  id={field.id}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 ${
                    errors[field.id] ? 'border-red-500' : ''
                  }`}
                />
              )}
              {errors[field.id] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.id].message}
                </p>
              )}
            </div>
          ))}

          {/* CV Upload */}
          <div className="mb-4 md:col-span-2">
            <label
              htmlFor="cv"
              className="block text-gray-700 font-medium mb-2"
            >
              Upload CV (.pdf, max 5MB)
            </label>
            <input
              type="file"
              {...register('cv')}
              id="cv"
              accept=".pdf"
              className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:cursor-not-allowed dark:text-gray-400 dark:file:bg-blue-500 dark:hover:file:bg-blue-400"
            />
            {errors.cv && (
              <p className="text-red-500 text-sm mt-1">{errors.cv.message}</p>
            )}
          </div>
        </form>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
          onClick={handleSubmit(onSubmit)}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UserProfileUpdate;
