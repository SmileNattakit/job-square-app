import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaFileAlt,
  FaUpload,
  FaTrash,
  FaDownload,
} from 'react-icons/fa';
import { authenticatedAxios } from '../../services/axiosInstances';
import { useAtom } from 'jotai';
import { authAtom } from '../../atoms/authAtom';
import { toast } from 'react-toastify';

const TalentProfile = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [cvFile, setCvFile] = useState(null);
  const [existingCvUrl, setExistingCvUrl] = useState(null);
  const [auth] = useAtom(authAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [initialData, setInitialData] = useState({});
  const inputFields = [
    { name: 'firstName', label: 'First Name', icon: FaUser, type: 'text' },
    { name: 'lastName', label: 'Last Name', icon: FaUser, type: 'text' },
    { name: 'email', label: 'Email', icon: FaEnvelope, type: 'email' },
    { name: 'phoneNumber', label: 'Phone Number', icon: FaPhone, type: 'tel' },
  ];

  useEffect(() => {
    const fetchTalentData = async () => {
      try {
        const response = await authenticatedAxios.get(
          `/talents/${auth.user.userId}`
        );
        const data = response.data;
        setInitialData(data);
        for (const field of inputFields) {
          setValue(field.name, data[field.name]);
        }
        if (data.cvFile) {
          setExistingCvUrl(data.cvFile);
        }
      } catch (error) {
        console.error('Error fetching talent data:', error);
        toast.error('Failed to load profile data');
      }
    };
    if (auth.user && auth.user.userId) {
      fetchTalentData();
    }
  }, [auth.user, setValue]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      // 5MB limit
      setCvFile(file);
    } else {
      toast.error('File size exceeds 5MB limit');
    }
  };

  const handleRemoveExistingCv = () => {
    setExistingCvUrl(null);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      // Only append fields that have changed
      Object.keys(data).forEach((key) => {
        if (data[key] !== initialData[key]) {
          formData.append(key, data[key]);
        }
      });

      if (cvFile) {
        formData.append('cvFile', cvFile);
      } else if (existingCvUrl === null && initialData.cvFile) {
        formData.append('removeCv', 'true');
      }

      // Only send request if there are changes
      if (formData.entries().next().done && !cvFile && existingCvUrl !== null) {
        toast.info('No changes to update');
        setIsLoading(false);
        return;
      }

      const response = await authenticatedAxios.patch(
        `/talents/${auth.user.userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Profile updated successfully:', response.data);
      toast.success('Profile updated successfully');
      if (response.data.talent.cvFile) {
        setExistingCvUrl(response.data.talent.cvFile);
      } else {
        setExistingCvUrl(null);
      }
      setCvFile(null);
      setInitialData(response.data.talent);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadCV = async () => {
    if (!existingCvUrl) {
      toast.error('No CV file available');
      return;
    }

    try {
      const publicId = existingCvUrl.split('/').pop().split('.')[0];
      const response = await authenticatedAxios.get(
        `/talents/download-cv/${publicId}`
      );
      const { downloadUrl } = response.data;

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.target = '_blank';
      link.download = 'CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading CV:', error);
      toast.error('Failed to download CV');
    }
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
                CV
              </label>
              {existingCvUrl ? (
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleDownloadCV}
                    className="text-blue-500 hover:underline flex items-center"
                  >
                    <FaDownload className="mr-2" />
                    Download Existing CV
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveExistingCv}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaUpload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{' '}
                        or drag and drop
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
              )}
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
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TalentProfile;
