type CreateTrainingDto = {
  id?: number;
  departmentId: string;
  trainingName: string;
  locationId: number;
  trainerId: number;
  coordinatorId: number;
  frequency: string;
  exam: string | null;
  trainingMaterials: string | null;
  from: string;
  to: string;
};

export default CreateTrainingDto;
