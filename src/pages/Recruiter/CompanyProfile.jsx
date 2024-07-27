import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaBuilding,
  FaEnvelope,
  FaGlobe,
  FaUpload,
  FaTrash,
  FaImage,
} from 'react-icons/fa';
import { authenticatedAxios } from '../../services/axiosInstances';
import { useAtom } from 'jotai';
import { authAtom } from '../../atoms/authAtom';
import { toast } from 'react-toastify';

const CompanyProfile = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [existingLogoUrl, setExistingLogoUrl] = useState(null);
  const [existingBannerUrl, setExistingBannerUrl] = useState(null);
  const [auth] = useAtom(authAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [initialData, setInitialData] = useState({});

  const inputFields = [
    {
      name: 'companyName',
      label: 'Company Name',
      icon: FaBuilding,
      type: 'text',
    },
    { name: 'email', label: 'Email', icon: FaEnvelope, type: 'email' },
    { name: 'website', label: 'Website', icon: FaGlobe, type: 'url' },
  ];

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await authenticatedAxios.get(
          `/recruiters/${auth.user.userId}`
        );
        const data = response.data;
        setInitialData(data);
        for (const field of inputFields) {
          setValue(field.name, data[field.name]);
        }
        setValue('description', data.description);
        if (data.logo) {
          setExistingLogoUrl(data.logo);
        }
        if (data.banner) {
          setExistingBannerUrl(data.banner);
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
        toast.error('Failed to load profile data');
      }
    };
    if (auth.user && auth.user.userId) {
      fetchCompanyData();
    }
  }, [auth.user, setValue]);

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      // 5MB limit
      setFile(file);
    } else {
      toast.error('File size exceeds 5MB limit');
    }
  };

  const handleRemoveExistingFile = (setExistingUrl) => {
    setExistingUrl(null);
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

      if (logoFile) {
        formData.append('logo', logoFile);
      } else if (existingLogoUrl === null && initialData.logo) {
        formData.append('removeLogo', 'true');
      }

      if (bannerFile) {
        formData.append('banner', bannerFile);
      } else if (existingBannerUrl === null && initialData.banner) {
        formData.append('removeBanner', 'true');
      }

      // Only send request if there are changes
      if (
        formData.entries().next().done &&
        !logoFile &&
        !bannerFile &&
        existingLogoUrl !== null &&
        existingBannerUrl !== null
      ) {
        toast.info('No changes to update');
        setIsLoading(false);
        return;
      }

      const response = await authenticatedAxios.patch(
        `/recruiters/${auth.user.userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Profile updated successfully:', response.data);
      toast.success('Profile updated successfully');
      if (response.data.recruiter.logo) {
        setExistingLogoUrl(response.data.recruiter.logo);
      } else {
        setExistingLogoUrl(null);
      }
      if (response.data.recruiter.banner) {
        setExistingBannerUrl(response.data.recruiter.banner);
      } else {
        setExistingBannerUrl(null);
      }
      setLogoFile(null);
      setBannerFile(null);
      setInitialData(response.data.recruiter);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Company Profile
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
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Company Description
              </label>
              <textarea
                id="description"
                {...register('description')}
                rows={4}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              ></textarea>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Company Logo
              </label>
              {existingLogoUrl ? (
                <div className="flex items-center space-x-2">
                  <img
                    src={existingLogoUrl}
                    alt="Company Logo"
                    className="w-20 h-20 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingFile(setExistingLogoUrl)}
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
                        PNG, JPG, GIF (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setLogoFile)}
                      accept="image/*"
                    />
                  </label>
                </div>
              )}
              {logoFile && (
                <p className="mt-2 text-sm text-gray-500">
                  <FaImage className="inline mr-2" />
                  {logoFile.name}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Company Banner
              </label>
              {existingBannerUrl ? (
                <div className="flex items-center space-x-2">
                  <img
                    src={existingBannerUrl}
                    alt="Company Banner"
                    className="w-full h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveExistingFile(setExistingBannerUrl)
                    }
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
                        PNG, JPG, GIF (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setBannerFile)}
                      accept="image/*"
                    />
                  </label>
                </div>
              )}
              {bannerFile && (
                <p className="mt-2 text-sm text-gray-500">
                  <FaImage className="inline mr-2" />
                  {bannerFile.name}
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

export default CompanyProfile;
