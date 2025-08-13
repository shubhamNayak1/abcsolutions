import User from './user';
import VendorDto from './vendor';

type TrainerDtoResponse = {
  id: number;
  vendor?: VendorDto | null;
  user?: User | null;
  personName: string;
  mobileNo: string;
  emailId: string;
  type: 'INTERNAL' | 'EXTERNAL';
};

export default TrainerDtoResponse;
