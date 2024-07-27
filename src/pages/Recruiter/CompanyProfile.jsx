import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaBuilding,
  FaEnvelope,
  FaUpload,
  FaUsers,
  FaMapMarkerAlt,
  FaPhone,
} from 'react-icons/fa';
import { authenticatedAxios } from '../../services/axiosInstances';
import { useAtom } from 'jotai';
import { authAtom } from '../../atoms/authAtom';
import { toast } from 'react-toastify';

const CompanyProfile = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [bannerFile, setBannerFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [existingBannerUrl, setExistingBannerUrl] = useState(null);
  const [existingLogoUrl, setExistingLogoUrl] = useState(null);
  const [auth] = useAtom(authAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [initialData, setInitialData] = useState({});

  const companySizeOptions = [
    { value: '1-50', label: '1-50 employees' },
    { value: '51-100', label: '51-100 employees' },
    { value: '101-1000', label: '101-1000 employees' },
    { value: '1000+', label: '1000+ employees' },
  ];

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const { data } = await authenticatedAxios.get(
          `/recruiters/${auth.user.userId}`
        );
        setInitialData(data);
        setValue('companyName', data.companyName);
        setValue('email', data.email);
        setValue('companySize', data.companySize);
        setValue('location', data.location);
        setValue('description', data.description);
        setValue('phoneNumber', data.phoneNumber);
        setExistingBannerUrl(data.banner);
        setExistingLogoUrl(data.logo);
      } catch (error) {
        console.error('Error fetching company data:', error);
        toast.error('Failed to load profile data');
      }
    };
    if (auth.user?.userId) fetchCompanyData();
  }, [auth.user, setValue]);

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setFile(file);
    } else {
      toast.error('File size exceeds 5MB limit');
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== initialData[key]) formData.append(key, value);
      });

      if (bannerFile) {
        formData.append('banner', bannerFile);
      } else if (existingBannerUrl === null && initialData.banner) {
        formData.append('removeBanner', 'true');
      }

      if (logoFile) {
        formData.append('logo', logoFile);
      } else if (existingLogoUrl === null && initialData.logo) {
        formData.append('removeLogo', 'true');
      }

      if (
        [...formData.entries()].length === 0 &&
        !bannerFile &&
        !logoFile &&
        existingBannerUrl !== null &&
        existingLogoUrl !== null
      ) {
        toast.info('No changes to update');
        setIsLoading(false);
        return;
      }

      const { data: responseData } = await authenticatedAxios.patch(
        `/recruiters/${auth.user.userId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      toast.success('Profile updated successfully');
      setExistingBannerUrl(responseData.recruiter.banner);
      setExistingLogoUrl(responseData.recruiter.logo);
      setBannerFile(null);
      setLogoFile(null);
      setInitialData(responseData.recruiter);
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="relative h-48 bg-gray-200">
            {existingBannerUrl ? (
              <img
                src={existingBannerUrl}
                alt="Company Banner"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <label className="cursor-pointer bg-white p-2 rounded-full shadow-md">
                  <FaUpload className="text-gray-500" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setBannerFile)}
                    accept="image/*"
                  />
                </label>
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="relative w-24 h-24 mr-4">
                {existingLogoUrl ? (
                  <img
                    src={existingLogoUrl}
                    alt="Company Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                    <label className="cursor-pointer">
                      <FaUpload className="text-gray-500" />
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setLogoFile)}
                        accept="image/*"
                      />
                    </label>
                  </div>
                )}
              </div>
              <div>
                <input
                  {...register('companyName')}
                  className="text-2xl font-bold mb-1 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
                  placeholder="Company Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Size
                </label>
                <div className="relative">
                  <FaUsers className="absolute top-3 left-3 text-gray-400" />
                  <select
                    {...register('companySize')}
                    className="pl-10 w-full p-2 border rounded-md appearance-none bg-white"
                  >
                    {companySizeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Address
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
                  <input
                    {...register('location')}
                    className="pl-10 w-full p-2 border rounded-md"
                    placeholder="e.g. Bangkok, Thailand"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                  <input
                    {...register('email')}
                    className="pl-10 w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
                    readOnly
                    disabled
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <FaPhone className="absolute top-3 left-3 text-gray-400" />
                  <input
                    {...register('phoneNumber')}
                    className="pl-10 w-full p-2 border rounded-md"
                    placeholder="e.g. +66 2 123 4567"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={4}
                className="w-full p-2 border rounded-md"
                placeholder="Company description..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CompanyProfile;
