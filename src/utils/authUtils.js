// utils/authUtils.js
import { jwtDecode } from 'jwt-decode';

export const decodeAndStoreToken = (token) => {
  const decodedToken = jwtDecode(token);
  localStorage.setItem('token', token);
  localStorage.setItem('userId', decodedToken.userId);
  localStorage.setItem('userRole', decodedToken.role);
  return decodedToken;
};

export const clearAuthStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('userRole');
};

// services/authService.js
import axios from 'axios';
import { API_URL } from '../config/api';

export const loginUser = async (email, password, accountType) => {
  const url =
    accountType === 'Talents'
      ? `${API_URL}/talents/login`
      : `${API_URL}/recruiters/login`;
  return await axios.post(url, { email, password });
};

// hooks/useLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAtom } from '../atoms/authAtom';
import { useAtom } from 'jotai';
import { decodeAndStoreToken, clearAuthStorage } from '../utils/authUtils';
import { loginUser } from '../services/authService';

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
      const response = await loginUser(email, password, accountType);

      if (response.data.token) {
        const decodedToken = decodeAndStoreToken(response.data.token);
        setAuth({ isAuthenticated: true, user: decodedToken });

        navigate(decodedToken.role === 'talent' ? '/job-listings' : '/admin');

        setTimeout(() => {
          setMessage(response.data.message);
        }, 2000);
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
    clearAuthStorage();
    setAuth({ isAuthenticated: false, user: null });
    navigate('/login');
  };

  return { isLoading, error, message, login, logout };
}

export default useLogin;
