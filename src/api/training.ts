import { AxiosResponse } from 'axios';
import apiInstance from './index';

import Location from '../dto/location';
import VendorDto from '../dto/vendor';
import ConferenceDto from '../dto/conference';
import TrainingTypeDto from '../dto/trainingType';
import TrainerDtoResponse from '../dto/trainerResponse';
import TrainerDto from '../dto/trainer';
import Exam from '../dto/exam';
import Questions from '../dto/questions';
import CoordinatorDto from '../dto/coordinator';

const getAllLocation = (): Promise<AxiosResponse> => {
  return apiInstance.get('/training/location');
};

const createLocation = (location: Location): Promise<AxiosResponse<Location>> => {
  return apiInstance.post('/training/location', location);
};

const getAllVendor = (): Promise<AxiosResponse> => {
  return apiInstance.get('/training/vendor');
};

const createVendor = (vendor: VendorDto): Promise<AxiosResponse<VendorDto>> => {
  return apiInstance.post('/training/vendor', vendor);
};

const getAllConference = (): Promise<AxiosResponse> => {
  return apiInstance.get('/training/conference');
};

const createConference = (conference: ConferenceDto): Promise<AxiosResponse<ConferenceDto>> => {
  return apiInstance.post('/training/conference', conference);
};

const getAllTrainingType = (): Promise<AxiosResponse> => {
  return apiInstance.get('/training/type');
};

const createTrainingType = (
  trainingType: TrainingTypeDto,
): Promise<AxiosResponse<TrainingTypeDto>> => {
  return apiInstance.post('/training/type', trainingType);
};

const getAllTrainer = (): Promise<AxiosResponse> => {
  return apiInstance.get('/training/trainers');
};

const createTrainers = (trainer: TrainerDto): Promise<AxiosResponse<TrainerDtoResponse>> => {
  return apiInstance.post('/training/trainers', trainer);
};

const createCoordinator = (coordinatorDto: CoordinatorDto): Promise<AxiosResponse> => {
  return apiInstance.post(`/coordinators?userId=${coordinatorDto.userId}`);
};

const getAllCoordinator = (): Promise<AxiosResponse> => {
  return apiInstance.get('/coordinators');
};

const uploadFile = (formData: FormData): Promise<AxiosResponse> => {
  return apiInstance.post('/materials/upload', formData);
};

const getALLMaterial = (): Promise<AxiosResponse> => {
  return apiInstance.get('/materials');
};

const createExam = (exam: Exam): Promise<AxiosResponse<Exam>> => {
  return apiInstance.post('/exams', exam);
};

const getAllExam = (): Promise<AxiosResponse> => {
  return apiInstance.get('/exams');
};

const createQuestions = (question: Questions): Promise<AxiosResponse<Questions>> => {
  return apiInstance.post('/questions', question);
};

const getAllQuestions = (): Promise<AxiosResponse> => {
  return apiInstance.get('/questions');
};

const getQuestionsById = (questionIds: number[]): Promise<AxiosResponse<Questions>> => {
  return apiInstance.post('/questions/by-ids', questionIds);
};

const getALLTraining = (): Promise<AxiosResponse> => {
  return apiInstance.get('/trainings');
};

export {
  getAllLocation,
  createLocation,
  getAllVendor,
  createVendor,
  getAllConference,
  createConference,
  getAllTrainingType,
  createTrainingType,
  getAllTrainer,
  createTrainers,
  uploadFile,
  getALLMaterial,
  createExam,
  createQuestions,
  getAllExam,
  getAllQuestions,
  createCoordinator,
  getAllCoordinator,
  getALLTraining,
};
