import { AxiosResponse } from 'axios';
import apiInstance from './index';

const getAllAudit = (): Promise<AxiosResponse> => {
  return apiInstance.get('/user/activity');
};

export { getAllAudit };
