type ConferenceDto = {
  id?: number;
  name: string;
  address: string;
  seatingCapacity: number;
  locationId: number;
  locationName?: string;
};

export default ConferenceDto;
