import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { authAtom } from '../atoms/authAtom';
import { useAtom } from 'jotai';
import { API_URL } from '../config/api';

function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();

  const login = async (email, password, accountType) => {
    setIsLoading(true);
    setError(null);

    try {
      const url =
        accountType === 'Talents'
          ? `${API_URL}/talents/login`
          : `${API_URL}/recruiters/login`;

      const response = await axios.post(url, { email, password });

      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        setAuth({ isAuthenticated: true, user: decodedToken });
        console.log('Decoded Token:', decodedToken);
        localStorage.setItem('userId', decodedToken.userId);
        localStorage.setItem('userRole', decodedToken.role);

        // เปลี่ยนเส้นทางตาม role (อาจต้องการปรับปรุง logic นี้)
        navigate(decodedToken.role === 'talent' ? '/job-listings' : '/admin');

        // แสดงข้อความสำเร็จหลังจากเปลี่ยนเส้นทาง
        setTimeout(() => {
          setMessage(response.data.message);
        }, 2000); // Delay 2 วินาทีเพื่อให้แน่ใจว่าเปลี่ยนเส้นทางเรียบร้อยแล้ว
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    navigate('/login');
  };
  return { isLoading, error, message, login, logout };
}

export default useLogin;
