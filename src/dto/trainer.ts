type TrainerDto = {
  userId?: number;
  personName?: string;
  vendorId?: number;
  mobileNo?: string;
  emailId?: string;
  type: 'internal' | 'external';
};

export default TrainerDto;
