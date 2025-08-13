type TrainingTypeDto = {
  id?: number;
  name: string;
  trainingType: string;
  trainingSubtype: string;
  departmentId: number;
  departmentName?: string;
};

export default TrainingTypeDto;
