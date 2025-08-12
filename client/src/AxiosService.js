import axios from 'axios';
import { baseUrl } from '../src/utils/constant';

// Create axios instance without token first
const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to attach token before each request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
        // localStorage.removeItem("token");
        window.location.href = "/admin/login";
    }
  }
);

// API functions
export const get = (url, config = {}) => instance.get(url, config);
export const post = (url, data, config = {}) => instance.post(url, data, config);
export const put = (url, data, config = {}) => instance.put(url, data, config);
export const Delete = (url, config = {}) => instance.delete(url, config);

export default instance;
 