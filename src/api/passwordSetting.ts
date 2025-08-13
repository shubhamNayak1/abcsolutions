import { AxiosResponse } from 'axios';
import apiInstance from './index';
import PasswordSetting from '../dto/passwordSettings';

const getAllPasswordSetting = (): Promise<AxiosResponse> => {
  return apiInstance.get('/password');
};

const getPasswordByID = (id: number): Promise<AxiosResponse> => {
  return apiInstance.get(`/password/${id}`);
};

const createPasswordSetting = (
  passwordSetting: PasswordSetting,
): Promise<AxiosResponse<PasswordSetting>> => {
  return apiInstance.post('/password', passwordSetting);
};

const updatePasswordSetting = (
  id: number,
  passwordSetting: PasswordSetting,
): Promise<AxiosResponse<PasswordSetting>> => {
  return apiInstance.put(`/password/${id}`, passwordSetting);
};

export { getPasswordByID, createPasswordSetting, updatePasswordSetting, getAllPasswordSetting };
