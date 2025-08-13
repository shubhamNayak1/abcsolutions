import createAxiosInstance from './createAxiosInstance';

const urlBackend = 'http://127.0.0.1:8080' || '';
const TIMEOUT_ON_SECOND = 100 * 120;

const appUrl = 'http://127.0.0.1:8080' + process.env.PUBLIC_URL;

const config = {
  baseURL: `${urlBackend}/api`,
  timeout: TIMEOUT_ON_SECOND,
};

const apiInstance = createAxiosInstance(config, appUrl);

export default apiInstance;
