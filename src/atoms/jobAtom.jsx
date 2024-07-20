import { atom, useAtom } from 'jotai';
import axios from 'axios';
import { useEffect } from 'react';
const jobsAtom = atom([]);
const loadingAtom = atom(true);
import { API_URL } from '../config/api';
// console.log(API_URL);

const getJobByIdAtom = atom(null, async (get, set, jobId) => {
  try {
    const response = await axios.get(`${API_URL}/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job by ID:', error);
    return null;
  }
});

export const useJobs = () => {
  const [jobs, setJobs] = useAtom(jobsAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [, getJobById] = useAtom(getJobByIdAtom); // อาจไม่จำเป็นต้องใช้

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_URL}/jobs`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); // dependency array ว่างเปล่า ทำให้ effect ทำงานครั้งเดียว

  return { jobs, loading, getJobById };
};
