import axios from 'axios';
import { API_URL } from '../config/api';

// สร้าง axios instance สำหรับ request ที่ไม่ต้องการ authentication
export const guestAxios = axios.create({
  baseURL: API_URL,
});

// สร้าง axios instance สำหรับ request ที่ต้องการ authentication
export const authenticatedAxios = axios.create({
  baseURL: API_URL,
});

// เพิ่ม interceptor สำหรับ authenticatedAxios เพื่อแนบ token กับทุก request
authenticatedAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// (ตัวเลือก) เพิ่ม interceptor สำหรับจัดการ response errors
authenticatedAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token หมดอายุหรือไม่ถูกต้อง
      // ทำการ logout หรือ refresh token ที่นี่
      localStorage.removeItem('token');
      // อาจจะ redirect ไปยังหน้า login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
