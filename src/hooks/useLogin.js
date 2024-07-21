import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { authAtom } from '../atoms/authAtom';
import { useAtom } from 'jotai';
import { guestAxios, authenticatedAxios } from '../services/axiosInstances';

function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setAuth({
            isAuthenticated: true,
            user: {
              userId: decodedToken.userId,
              role: decodedToken.role,
              name:
                decodedToken.role === 'talent'
                  ? decodedToken.firstName
                  : decodedToken.companyName,
            },
          });
        } else {
          // Token expired
          localStorage.removeItem('token');
          setAuth({ isAuthenticated: false, user: null });
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        setAuth({ isAuthenticated: false, user: null });
      }
    }
  }, [setAuth]);

  const login = async (email, password, accountType) => {
    setIsLoading(true);
    setError(null);

    try {
      const url =
        accountType === 'Talents' ? '/talents/login' : '/recruiters/login';

      const response = await guestAxios.post(url, { email, password });

      if (response.data.token) {
        const token = response.data.token;
        const decodedToken = jwtDecode(token);

        const newAuthState = {
          isAuthenticated: true,
          user: {
            userId: decodedToken.userId,
            role: decodedToken.role,
            name:
              decodedToken.role === 'talent'
                ? decodedToken.firstName
                : decodedToken.companyName,
          },
        };

        setAuth(newAuthState);
        localStorage.setItem('token', token);

        console.log('New auth state set:', newAuthState);

        navigate(decodedToken.role === 'talent' ? '/job-listings' : '/admin');

        setMessage(response.data.message || 'Login successful');
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
    setAuth({ isAuthenticated: false, user: null });
    navigate('/login');
  };

  return { isLoading, error, message, login, logout, auth };
}

export default useLogin;
