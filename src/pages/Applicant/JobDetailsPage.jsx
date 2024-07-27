import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FaChevronLeft,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaTag,
  FaClock,
  FaUpload,
  FaTimes,
} from 'react-icons/fa';
import { authenticatedAxios } from '../../services/axiosInstances';
import { useAtom } from 'jotai';
import { authAtom } from '../../atoms/authAtom';
import toast from 'react-hot-toast';

const JobDetailPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [auth] = useAtom(authAtom);
  const [job, setJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [useCurrentCV, setUseCurrentCV] = useState(true);
  const [file, setFile] = useState(null);
  const [interest, setInterest] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await authenticatedAxios.get(`/jobs/${jobId}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
        navigate('/job-listings');
      }
    };
    fetchJobDetails();
  }, [jobId, navigate]);

  const handleApply = () => {
    if (!auth.user) {
      navigate('/login', { state: { from: `/job-listings/${jobId}` } });
      return;
    }
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('talentId', auth.user.userId);
      formData.append('useCurrentCV', useCurrentCV);
      if (!useCurrentCV && file) {
        formData.append('cv', file);
      }
      formData.append('interest', interest);
      formData.append('coverLetter', coverLetter);

      await authenticatedAxios.post(`/jobs/${jobId}/apply`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('ส่งใบสมัครเรียบร้อยแล้ว!');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('เกิดข้อผิดพลาดในการส่งใบสมัคร');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/job-listings"
          className="text-blue-600 hover:text-blue-800 flex items-center mb-6"
        >
          <FaChevronLeft className="mr-2" /> กลับไปยังรายการงาน
        </Link>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
              <img
                src={job.recruiterId.logo}
                alt={job.recruiterId.name}
                className="w-20 h-20 object-contain mr-6 rounded-full shadow"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {job.title}
                </h1>
                <h2 className="text-xl text-blue-600 mb-1">
                  {job.recruiterId.companyName}
                </h2>
                <a
                  href={job.recruiterId.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  {job.recruiterId.website}
                </a>
              </div>
            </div>
            <button
              onClick={handleApply}
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
            >
              สมัครงาน
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <InfoItem icon={FaMapMarkerAlt} text={job.location} />
            <InfoItem icon={FaBriefcase} text={job.type} />
            <InfoItem
              icon={FaMoneyBillWave}
              text={`${job.salary.toLocaleString()} บาท`}
            />
            <InfoItem icon={FaTag} text={job.category} />
          </div>
          <div className="bg-blue-50 p-4 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              รายละเอียดงาน
            </h2>
            <p className="text-gray-700">{job.description}</p>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              คุณสมบัติที่ต้องการ
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              {job.requirements.map((req, index) => (
                <li key={index} className="mb-2">
                  {req}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              ทักษะที่ต้องการ
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-500 text-sm flex items-center">
              <FaClock className="mr-2" />
              วันที่ลงประกาศ: {new Date(job.posted).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-800">
                สมัครงาน: {job.title}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-blue-700 mb-2">
                  ทำไมคุณถึงสนใจทำงานที่ {job.recruiterId.companyName}
                </label>
                <textarea
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  placeholder={`กล่าวถึงสิ่งที่คุณสนใจเกี่ยวกับ ${job.recruiterId.companyName} ทำไมคุณถึงเป็นผู้สมัครที่เหมาะสม?`}
                  required
                ></textarea>
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-700 mb-2">
                  ส่ง CV ที่อัปเดตแล้ว
                </p>
                <div className="flex items-center gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={useCurrentCV}
                      onChange={() => setUseCurrentCV(true)}
                      className="mr-2 text-blue-600"
                    />
                    ใช้ CV ปัจจุบัน
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={!useCurrentCV}
                      onChange={() => setUseCurrentCV(false)}
                      className="mr-2 text-blue-600"
                    />
                    อัปโหลด CV ใหม่
                  </label>
                </div>
              </div>
              {!useCurrentCV && (
                <div>
                  <button
                    type="button"
                    onClick={() => document.getElementById('cv-upload').click()}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition duration-300"
                  >
                    <FaUpload className="mr-2" /> เลือกไฟล์
                  </button>
                  <input
                    id="cv-upload"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf"
                  />
                  <p className="text-sm text-blue-500 mt-2">
                    {file ? file.name : 'ยังไม่ได้เลือกไฟล์'}
                  </p>
                  <p className="text-xs text-blue-400">
                    เฉพาะไฟล์ PDF ขนาดไม่เกิน 5MB
                  </p>
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-blue-700 mb-2">
                  Cover Letter (ไม่จำเป็น)
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="6"
                  placeholder="เพิ่ม Cover Letter ของคุณที่นี่"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-full w-full hover:bg-blue-700 transition duration-300 text-lg font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'กำลังส่งใบสมัคร...' : 'ส่งใบสมัคร'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ icon: Icon, text }) => (
  <div className="flex items-center bg-blue-50 p-3 rounded-lg">
    <Icon className="text-blue-500 mr-3" />
    <span className="text-gray-700">{text}</span>
  </div>
);

export default JobDetailPage;
