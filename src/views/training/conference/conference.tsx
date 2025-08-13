import React, { useCallback, useEffect, useState } from 'react';
import Card from '../../../components/card/card';
import './conference.css';
import SearchableTable from '../../../components/table/searchableTable';
import { createConference, getAllConference, getAllLocation } from '../../../api/training';
import ConferenceDto from '../../../dto/conference';
import Location from '../../../dto/location';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

const Conference: React.FC = () => {
  const [location, setLocation] = useState<Location[]>([]);

  const columns = ['locationName', 'name', 'address', 'seatingCapacity'];
  const columnLabels = {
    locationName: 'Training Location',
    name: 'Conference Name',
    address: 'Address',
    seatingCapacity: 'Seating Capacity',
  };
  const [data, setData] = useState<Record<string, any>[]>([]);

  const loadConference = useCallback(async () => {
    try {
      const { data } = await getAllConference();
      setData(data);
    } catch {
      console.log('error');
    }
  }, []);

  const loadLocation = useCallback(async () => {
    try {
      const { data } = await getAllLocation();
      setLocation(data);
    } catch {
      console.log('error');
    }
  }, []);

  useEffect(() => {
    loadConference();
    loadLocation();
  }, []);

  const emptyForm: ConferenceDto = {
    name: '',
    address: '',
    seatingCapacity: 0,
    locationId: -1,
  };

  const [formConferenceData, setFormConferenceData] = useState<ConferenceDto>({
    name: '',
    address: '',
    seatingCapacity: 0,
    locationId: -1,
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormConferenceData({ ...formConferenceData, [name]: value });
  };

  const handleTrainingConferenceSave = () => {
    createConference(formConferenceData)
      .then((response: AxiosResponse) => {
        toast.success('Conference created successfully!');
        loadConference();
        setFormConferenceData(emptyForm);
      })
      .catch((error) => {
        toast.error('Error creating Conference. Please try again.');
      });
  };

  return (
    <>
      <div className="conference">
        <div className="header-band">Conference</div>
        <Card>
          <div className="createConferenceHeader">Conference Add</div>
          <div className="createConferenceBody">
            <div className="createConferenceBodyrow">
              <div className="createConferenceBodyrowlabel">Training Location</div>
              <div>
                <select
                  name="locationId"
                  value={formConferenceData.locationId}
                  onChange={handleChange}
                >
                  <option value="">Select Location</option>
                  {location.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="createConferenceBodyrow">
              <div className="createConferenceBodyrowlabel">Conference Name</div>
              <div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formConferenceData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="createConferenceBodyrow">
              <div className="createConferenceBodyrowlabel">Address</div>
              <div>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formConferenceData.address}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="createConferenceBodyrow">
              <div className="createConferenceBodyrowlabel">Seating Capacity</div>
              <div>
                <input
                  type="number"
                  name="seatingCapacity"
                  id="seatingCapacity"
                  value={formConferenceData.seatingCapacity}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="saveButtonConference">
              <div>
                <button onClick={handleTrainingConferenceSave}> Save </button>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <SearchableTable columnLabels={columnLabels} columns={columns} data={data} />
        </Card>
      </div>
    </>
  );
};

export default Conference;
