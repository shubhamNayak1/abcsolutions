import { AxiosResponse } from 'axios';
import apiInstance from './index';

import User from '../dto/user';

const getAllUsers = (): Promise<AxiosResponse> => {
  return apiInstance.get('/users');
};

const getAllUsersCount = (): Promise<AxiosResponse> => {
  return apiInstance.get('/users/count');
};

const createUser = (user: User): Promise<AxiosResponse<User>> => {
  return apiInstance.post('/users', user);
};

export { createUser, getAllUsers, getAllUsersCount };
