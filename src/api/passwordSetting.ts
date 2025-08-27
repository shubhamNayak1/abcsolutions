import { AxiosResponse } from 'axios';
import apiInstance from './index';
import PasswordSetting from '../dto/passwordSettings';
import ChangePasswordDto from '../dto/changepassword';
import GetPasswordPolicyDto from '../dto/getPasswordPolicy';

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

const changepasswordApi = (
  changePasswordDto: ChangePasswordDto,
): Promise<AxiosResponse<ChangePasswordDto>> => {
  return apiInstance.post(`/auth/change-password`, changePasswordDto);
};

const getPasswordPolicy = (): Promise<AxiosResponse<GetPasswordPolicyDto>> => {
  return apiInstance.get('/password/get-password-policy/latest');
};

export {
  getPasswordByID,
  createPasswordSetting,
  updatePasswordSetting,
  getAllPasswordSetting,
  changepasswordApi,
  getPasswordPolicy,
};
