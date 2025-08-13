import axios, { AxiosRequestConfig, AxiosHeaders } from 'axios';

const createAxiosInstance = (config: AxiosRequestConfig, appUrl: string) => {
  const instance = axios.create({
    ...config,
    validateStatus: (status: number) => status >= 200 && status < 300,
  });

  // Add JWT token to headers
  instance.interceptors.request.use(
    (request) => {
      const token = localStorage.getItem('jwt');
      if (token) {
        request.headers = AxiosHeaders.from({
          ...request.headers,
          Authorization: `Bearer ${token}`,
        });
      }
      return request;
    },
    (error) => Promise.reject(error),
  );

  // Optional: Global error handling
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('jwt');
        window.location.href = '/';
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export default createAxiosInstance;
