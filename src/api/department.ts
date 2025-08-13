import { AxiosResponse } from 'axios';
import apiInstance from './index';
import Department from '../dto/department';

const getAllDepartment = (): Promise<AxiosResponse> => {
  return apiInstance.get('/department');
};

const getAllDepartmentCount = (): Promise<AxiosResponse> => {
  return apiInstance.get('/department/count');
};

const createDepartment = (department: Department): Promise<AxiosResponse<Department>> => {
  return apiInstance.post('/department', department);
};

export { getAllDepartment, createDepartment, getAllDepartmentCount };
