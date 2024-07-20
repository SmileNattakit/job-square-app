import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaFileAlt,
  FaUpload,
} from 'react-icons/fa';

const TalentProfile = () => {
  const { register, handleSubmit, setValue } = useForm();

  const [cvFile, setCvFile] = useState(null);

  const inputFields = [
    { name: 'firstName', label: 'First Name', icon: FaUser, type: 'text' },
    { name: 'lastName', label: 'Last Name', icon: FaUser, type: 'text' },
    { name: 'email', label: 'Email', icon: FaEnvelope, type: 'email' },
    { name: 'phoneNumber', label: 'Phone Number', icon: FaPhone, type: 'tel' },
  ];

  useEffect(() => {
    const fetchTalentData = async () => {
      try {
        const data = {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phoneNumber: '+1 234 567 8900',
        };
        for (const field of inputFields) {
          setValue(field.name, data[field.name]);
        }
      } catch (error) {
        console.error('Error fetching talent data:', error);
      }
    };
    fetchTalentData();
  }, [setValue]);

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    console.log('Updated talent data:', data);
    console.log('Uploaded CV:', cvFile);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Talent Profile
        </h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              {inputFields.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    {field.label}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <field.icon className="text-gray-500" />
                    </div>
                    <input
                      type={field.type}
                      id={field.name}
                      {...register(field.name, { required: true })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Upload CV
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaUpload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, DOCX (MAX. 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                </label>
              </div>
              {cvFile && (
                <p className="mt-2 text-sm text-gray-500">
                  <FaFileAlt className="inline mr-2" />
                  {cvFile.name}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TalentProfile;
