import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaUpload } from 'react-icons/fa';
import { useJobs } from '../../atoms/jobAtom';
import { useAtom } from 'jotai';
import { authAtom } from '../../atoms/authAtom';
import axios from 'axios';

const JobApplicationPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { getJobById } = useJobs();
  const [auth] = useAtom(authAtom);
  const [job, setJob] = useState(location.state?.job || null);
  const [useCurrentCV, setUseCurrentCV] = useState(true);
  const [file, setFile] = useState(null);
  const [interest, setInterest] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!job) {
        const jobData = await getJobById(jobId);
        setJob(jobData);
      }
    };

    fetchJobDetails();
  }, [jobId, getJobById, job]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [navigate, location]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    const talentId = localStorage.getItem('userId');

    if (!token || !talentId) {
      setError('คุณต้องเข้าสู่ระบบก่อนสมัครงาน');
      setIsLoading(false);
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/jobs/${jobId}/apply`,
        {
          talentId: talentId,
          useCurrentCV: useCurrentCV,
          cv: file ? file.name : null,
          interest: interest,
          coverLetter: coverLetter,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Application submitted:', response.data);
      alert('ส่งใบสมัครเรียบร้อยแล้ว!');
      navigate(-1);
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการส่งใบสมัคร: ' + err.message);
      console.error('Error submitting application:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!job) {
    return <div className="container mx-auto px-4 py-8">กำลังโหลด...</div>;
  }

  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 mb-6 hover:text-blue-800 transition duration-300"
        >
          <FaArrowLeft className="mr-2" /> กลับ
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-blue-800 mb-2">
                {job.recruiterId.companyName}
              </h1>
              <h2 className="text-2xl font-semibold ">{job.title}</h2>
            </div>
          </div>

          <p className="text-sm text-blue-500 mb-6">
            ลงประกาศเมื่อ {new Date(job.posted).toLocaleDateString()}
          </p>

          <div className="flex gap-4 mb-8">
            <div className="border border-blue-200 rounded-lg px-4 py-2 flex items-center">
              <span className="mr-2">📁</span>
              <div>
                <p className="text-xs text-blue-500">หมวดหมู่</p>
                <p className="font-semibold">{job.category}</p>
              </div>
            </div>
            <div className="border border-blue-200 rounded-lg px-4 py-2 flex items-center">
              <span className="mr-2">🗓️</span>
              <div>
                <p className="text-xs text-blue-500">ประเภท</p>
                <p className="font-semibold">{job.type}</p>
              </div>
            </div>
            <div className="border border-blue-200 rounded-lg px-4 py-2 flex items-center">
              <span className="mr-2">💰</span>
              <div>
                <p className="text-xs text-blue-500">เงินเดือน</p>
                <p className="font-semibold">{job.salary}</p>
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">
              กรอกใบสมัครของคุณ
            </h3>

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
              ></textarea>
              <p className="text-xs text-blue-500 mt-1">
                ระหว่าง 50 ถึง 1000 ตัวอักษร
              </p>
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
              disabled={isLoading}
            >
              {isLoading ? 'กำลังส่งใบสมัคร...' : 'ส่งใบสมัคร'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPage;
