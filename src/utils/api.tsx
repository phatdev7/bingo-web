import axios from 'axios';
import { API_HOST } from '../constant';

const REST = axios.create({
  baseURL: `${API_HOST}/api`,

  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

REST.interceptors.request.use(async config => {
  try {
    config.params = { locale: 'en' };
    config.headers = {
      ...config.headers,
    };
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

REST.interceptors.response.use(
  res => res,
  error => {
    if (error.message === 'Network Error') {
      // alert(error.message);
    } else if (
      error.response &&
      error.response.status === 401 &&
      !error.response.request.responseURL.includes('sign_in')
    ) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  },
);

export default REST;
