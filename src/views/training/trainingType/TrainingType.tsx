import React, { useCallback, useEffect, useState } from 'react';
import Card from '../../../components/card/card';
import './TrainingType.css';
import DialogBox from '../../../components/dialogBox/dialogBox';
import SearchableTable from '../../../components/table/searchableTable';
import {
  createLocation,
  createTrainingType,
  getAllLocation,
  getAllTrainingType,
} from '../../../api/training';
import Location from '../../../dto/location';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import TrainingTypeDto from '../../../dto/trainingType';
import Department from '../../../dto/department';
import { getAllDepartment } from '../../../api/department';

const TrainingType: React.FC = () => {
  const [trainingSubType, setTrainingSubType] = useState(false);
  const [trainingLocation, setTrainingLocation] = useState(false);

  const emptyLocation: Location = {
    name: '',
    status: 'Active',
  };

  const emptyTraining: TrainingTypeDto = {
    name: '',
    trainingType: '',
    trainingSubtype: '',
    departmentId: -1,
  };

  const [formLocationData, setFormLocationData] = useState<Location>({
    name: '',
    status: 'Active',
  });

  const [formData, setFormData] = useState<TrainingTypeDto>({
    name: '',
    trainingType: '',
    trainingSubtype: '',
    departmentId: -1,
  });

  const [dataLocation, setDataLocation] = useState<Record<string, any>[]>([]);

  const [data, setData] = useState<Record<string, any>[]>([]);

  const [department, setDepartment] = useState<Department[]>([]);

  const loadDepartment = useCallback(async () => {
    try {
      const { data } = await getAllDepartment();
      setDepartment(data);
    } catch {
      console.log('error');
    }
  }, []);

  const loadLocation = useCallback(async () => {
    try {
      const { data } = await getAllLocation();
      setDataLocation(data);
    } catch {
      console.log('error');
    }
  }, []);

  const loadTrainingType = useCallback(async () => {
    try {
      const { data } = await getAllTrainingType();
      setData(data);
    } catch {
      console.log('error');
    }
  }, []);

  useEffect(() => {
    loadLocation();
    loadTrainingType();
    loadDepartment();
  }, []);

  const handleTrainingTypeOpen = (input: string) => {
    if (input === 'trainingSubType') {
      setTrainingSubType(true);
    } else {
      setTrainingLocation(true);
    }
  };

  const handleTrainingSubTypeClose = () => {
    setTrainingSubType(false);
  };

  const handleTrainingLocationClose = () => {
    setTrainingLocation(false);
  };

  const handleTrainingSubTypeSave = () => {
    createTrainingType(formData)
      .then((response: AxiosResponse) => {
        toast.success('Training Type created successfully!');
        loadTrainingType();
        setFormData(emptyTraining);
      })
      .catch((error) => {
        toast.error('Error creating Training Type. Please try again.');
      });
    handleTrainingSubTypeClose();
  };

  const handleTrainingLocationSave = () => {
    createLocation(formLocationData)
      .then((response: AxiosResponse) => {
        toast.success('Location created successfully!');
        loadLocation();
        setFormLocationData(emptyLocation);
      })
      .catch((error) => {
        toast.error('Error creating Location. Please try again.');
      });
    handleTrainingLocationClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormLocationData({ ...formLocationData, [name]: value });
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(name + value);
  };

  const columns = ['departmentName', 'name', 'trainingType', 'trainingSubtype'];
  const columnLabels = {
    departmentName: 'Department Name',
    name: 'Training Name',
    trainingType: 'Training Type',
    trainingSubtype: 'Training Sub Type',
  };

  const columnLocation = ['name', 'status'];
  const columnLabelsLocation = { name: 'Location', status: 'Status' };

  return (
    <>
      <div className="trainingType">
        <div className="header-band">Training Type</div>
        <Card>
          <div className="allbutton">
            <div className="saveButtonTraining">
              <button onClick={() => handleTrainingTypeOpen('trainingSubType')}>
                Create Training Type
              </button>
            </div>
            <div className="saveButtonTraining">
              <button onClick={() => handleTrainingTypeOpen('trainingLoaction')}>
                Add Training Location
              </button>
            </div>
          </div>
          <div>
            <SearchableTable columnLabels={columnLabels} columns={columns} data={data} />
          </div>
        </Card>
        <Card>
          <div className="header-band">Location</div>
          <SearchableTable
            columnLabels={columnLabelsLocation}
            columns={columnLocation}
            data={dataLocation}
          />
        </Card>
        <DialogBox
          isOpen={trainingSubType}
          onClose={handleTrainingSubTypeClose}
          onSave={handleTrainingSubTypeSave}
          title={'Create Training Sub Type'}
        >
          <div className="createTrainingTypeBody">
            <div className="createTrainingTypeBodyrow">
              <div className="createTrainingTypeBodyrowlabel">Department Name</div>
              <div>
                <select
                  name="departmentId"
                  value={formData.departmentId}
                  onChange={handleTypeChange}
                >
                  <option value="">Select Department</option>
                  {department.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.departmentName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="createTrainingTypeBodyrow">
              <div className="createTrainingTypeBodyrowlabel">Training Name</div>
              <div>
                <input
                  type="text"
                  name="name"
                  id="sectionName"
                  value={formData.name}
                  onChange={handleTypeChange}
                />
              </div>
            </div>
            <div className="createTrainingTypeBodyrow">
              <div className="createTrainingTypeBodyrowlabel">Training Type</div>
              <div>
                <input
                  type="text"
                  name="trainingType"
                  id="trainingType"
                  value={formData.trainingType}
                  onChange={handleTypeChange}
                />
              </div>
            </div>
            <div className="createTrainingTypeBodyrow">
              <div className="createTrainingTypeBodyrowlabel">Training Sub Type</div>
              <div>
                <input
                  type="text"
                  name="trainingSubtype"
                  id="trainingSubtype"
                  value={formData.trainingSubtype}
                  onChange={handleTypeChange}
                />
              </div>
            </div>
          </div>
        </DialogBox>
        <DialogBox
          isOpen={trainingLocation}
          onClose={handleTrainingLocationClose}
          onSave={handleTrainingLocationSave}
          title={'Add Training Location'}
        >
          <div className="createTrainingTypeBody">
            <div className="createTrainingTypeBodyrow">
              <div className="createTrainingTypeBodyrowlabel">Location</div>
              <div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formLocationData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </DialogBox>
      </div>
    </>
  );
};

export default TrainingType;
