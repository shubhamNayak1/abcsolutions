import { AxiosResponse } from 'axios';
import apiInstance from './index';
import UserGroup from '../dto/userGroup';

const getAllUserGroup = (): Promise<AxiosResponse> => {
  return apiInstance.get('/user/group');
};

const getAllUserGroupCount = (): Promise<AxiosResponse> => {
  return apiInstance.get('/user/group/count');
};

const createUserGroup = (userGroup: UserGroup): Promise<AxiosResponse<UserGroup>> => {
  return apiInstance.post('/user/group', userGroup);
};

export { getAllUserGroup, createUserGroup, getAllUserGroupCount };
