import React, { useCallback, useEffect, useState } from 'react';
import Card from '../../../../components/card/card';
import './Create.css';
import RadioButtonGroup from '../../../../components/radioButtonGroup/RadioButtonGroup';
import { FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DialogBox from '../../../../components/dialogBox/dialogBox';
import SearchableTable from '../../../../components/table/searchableTable';
import axios, { AxiosResponse } from 'axios';
import {
  getAllCoordinator,
  getAllLocation,
  getALLMaterial,
  getAllTrainer,
  getAllTrainingType,
  uploadFile,
} from '../../../../api/training';
import { toast } from 'react-toastify';
import CreateTrainingDto from '../../../../dto/createTraining';
import { formatMonth } from 'react-calendar/dist/cjs/shared/dateFormatter';

const Create: React.FC = () => {
  const navigate = useNavigate();

  const createExam = () => {
    navigate('add-exam');
  };

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  const [dataDataDepartment, setDataDepartment] = useState<Record<string, any>[]>([]);
  const [dataDepartment, setDepartment] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    const departmentMap = new Map();
    dataDataDepartment.forEach((item) => {
      if (!departmentMap.has(item.departmentId)) {
        departmentMap.set(item.departmentId, item.departmentName);
      }
    });

    const uniqueDepartments = Array.from(departmentMap, ([id, name]) => ({
      departmentId: id,
      departmentName: name,
    }));
    setDepartment(uniqueDepartments);
  }, [dataDataDepartment]);

  const loadTrainingType = useCallback(async () => {
    try {
      const { data } = await getAllTrainingType();
      setDataDepartment(data);
    } catch {
      console.log('error');
    }
  }, []);

  const [location, setLocation] = useState<Record<string, any>[]>([]);

  const loadLocation = useCallback(async () => {
    try {
      const { data } = await getAllLocation();
      setLocation(data);
    } catch {
      console.log('error');
    }
  }, []);

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('materialType', selectedMaterialValue);
      uploadFile(formData)
        .then((response: AxiosResponse) => {
          toast.success('File Uploaded successfully!');
          loadmaterial();
          handleMaterialClose();
        })
        .catch((error) => {
          toast.error('Error uploading file. Please try again.');
        });
    }
  };

  const [addMaterial, setAddMaterial] = useState(false);

  const [addNewMaterial, setAddNewMaterial] = useState(false);

  const handleAddNewMaterial = () => {
    setAddNewMaterial(!addNewMaterial);
  };

  const handleMaterialOpen = () => {
    setAddMaterial(true);
  };

  const columns = ['materialName', 'materialType', 'Use'];
  const columnLabels = { materialName: 'Material Name', materialType: 'Matrial Type', Use: 'Use' };

  const [data, setData] = useState<Record<string, any>[]>([]);

  const loadmaterial = useCallback(async () => {
    try {
      const { data } = await getALLMaterial();
      setData(data);
    } catch {
      console.log('error');
    }
  }, []);

  useEffect(() => {
    loadmaterial();
    loadTrainingType();
    loadLocation();
    loadTrainer();
    loadCoordinator();
  }, []);

  const handleMaterialClose = () => {
    setAddMaterial(false);
  };

  const [selectedTrainingValue, setSelectedTrainingValue] = useState<string>('withMaterial');

  const handleTrainingRadioChange = (value: string) => {
    setSelectedTrainingValue(value);
  };

  const optionsTraining = [
    { label: 'With Training Material', value: 'withMaterial' },
    { label: 'Without Training Material', value: 'withoutMaterial' },
  ];

  const [selectedExamValue, setSelectedExamValue] = useState<string>('no');

  const handleExamRadioChange = (value: string) => {
    setSelectedExamValue(value);
  };

  const optionsExam = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];

  const [selectedMaterialValue, setSelectedMaterialValue] = useState<string>('pdf');

  const optionsMaterial = [
    { label: 'PDF', value: 'pdf' },
    { label: 'Video', value: 'video' },
  ];

  const handleMaterialRadioChange = (value: string) => {
    setSelectedMaterialValue(value);
  };

  const [selectedFrequencyValue, setSelectedFrequencyValue] = useState<string>('once');

  const optionsFrequency = [
    { label: 'One Time', value: 'once' },
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Quaterly', value: 'quaterly' },
    { label: 'Yearly', value: 'yearly' },
  ];

  const handleFrequencyRadioChange = (value: string) => {
    setSelectedFrequencyValue(value);
    setFormData({ ...formData, ['frequency']: value });
  };

  const [formData, setFormData] = useState<CreateTrainingDto>({
    departmentId: '',
    trainingName: '',
    locationId: -1,
    trainerId: -1,
    coordinatorId: -1,
    frequency: 'once',
    trainingMaterials: null,
    exam: null,
    from: '',
    to: '',
  });

  const [formDepartmentData, setDepartmentFormData] = useState<string>();
  const [tainingName, setTainingName] = useState<string[]>([]);
  const [trainingType, setTrainingType] = useState<string[]>([]);
  const [trainingSubType, setTrainingSubType] = useState<string[]>([]);

  useEffect(() => {
    if (formDepartmentData) {
      const filteredData = dataDataDepartment.filter((item) =>
        formDepartmentData.includes(item.departmentName),
      );

      // Extract unique training names from the filtered data
      const trainingNamesSet = new Set(filteredData.map((item) => item.name));

      // Convert Set to Array
      const uniqueTrainingNames = Array.from(trainingNamesSet);

      // Update state with unique training names
      setTainingName(uniqueTrainingNames);
    }
  }, [formDepartmentData]);

  const handleTypeChangeDept = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setDepartmentFormData(value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [dataTrainer, setDataTrainer] = useState<Record<string, any>[]>([]);
  const loadTrainer = useCallback(async () => {
    try {
      const { data } = await getAllTrainer();
      setDataTrainer(data);
    } catch {
      console.log('error');
    }
  }, []);

  const handleTrainerChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [dataCoordinator, setDataCoordinator] = useState<Record<string, any>[]>([]);
  const loadCoordinator = useCallback(async () => {
    try {
      const { data } = await getAllCoordinator();
      setDataCoordinator(data);
    } catch {
      console.log('error');
    }
  }, []);

  const handleCoordinatorChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFromChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { value } = event.target;
    setFormData({ ...formData, ['from']: value });
  };

  const handleToChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { value } = event.target;
    setFormData({ ...formData, ['to']: value });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    handleFromChange(event);
    // handleToChange(event);
    // const { value } = event.target;

    // setFormData({ ...formData, ['to']: value });
    // setFormData({ ...formData, ['from']: value });
  };

  const handleSave = () => {
    console.log(formData);
  };

  return (
    <>
      <div className="induction">
        <Card>
          <div className="createInductionTrainingBody">
            <div className="createInductionTrainingBodyrow">
              <div className="createInductionTrainingBodyrowlabel">Department Name</div>
              <div>
                <select
                  name="departmentId"
                  value={formData.departmentId}
                  onChange={handleTypeChangeDept}
                >
                  <option value="">Select Department</option>
                  {dataDepartment.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.departmentName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="createInductionTrainingBodyrow">
              <div className="createInductionTrainingBodyrowlabel">Training Name</div>
              <div>
                <select
                  name="trainingName"
                  value={formData.trainingName}
                  onChange={handleTypeChange}
                >
                  <option value="">Select Training Name</option>
                  {tainingName.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="createInductionTrainingBodyrow">
              <div className="createInductionTrainingBodyrowlabel">Training Type</div>
              <div>
                <input
                  type="text"
                  name="inductionTrainingName"
                  id="inductionTrainingName"
                  value=""
                />
              </div>
            </div>
            <div className="createInductionTrainingBodyrow">
              <div className="createInductionTrainingBodyrowlabel">Training Sub Type</div>
              <div>
                <input
                  type="text"
                  name="inductionTrainingName"
                  id="inductionTrainingName"
                  value=""
                />
              </div>
            </div>
            <div className="createInductionTrainingBodyrow">
              <div className="createInductionTrainingBodyrowlabel">Location</div>
              <div>
                <select name="locationId" value={formData.locationId} onChange={handleTypeChange}>
                  <option value="">Select Location</option>
                  {location.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="createInductionTrainingBodyrow">
              <div className="createInductionTrainingBodyrowlabel">Trainer</div>
              <div>
                <select name="trainerId" value={formData.trainerId} onChange={handleTrainerChange}>
                  <option value="">Select Trainer</option>
                  {dataTrainer.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.personName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="createInductionTrainingBodyrow">
              <div className="createInductionTrainingBodyrowlabel">Co-ordinator</div>
              <div>
                <select
                  name="coordinatorId"
                  value={formData.coordinatorId}
                  onChange={handleCoordinatorChange}
                >
                  <option value="">Select Coordinator</option>
                  {dataCoordinator.map((dept) => (
                    <option key={dept.userId} value={dept.userId}>
                      {dept.username}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="createInductionTrainingBodyrow">
              <div className="createInductionTrainingBodyrowlabel">Training</div>
              <div className="trainingRadioButton">
                <RadioButtonGroup
                  options={optionsTraining}
                  selectedValue={selectedTrainingValue}
                  onChange={handleTrainingRadioChange}
                />
                {selectedTrainingValue === 'withMaterial' ? (
                  <button
                    className="trainingRadioUploadButton"
                    onClick={() => handleMaterialOpen()}
                  >
                    <FaUpload />
                    &nbsp;&nbsp;&nbsp;Add Material
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="createInductionTrainingBodyrow">
              <div className="createInductionTrainingBodyrowlabel">Exam</div>
              <div className="trainingRadioButton">
                <RadioButtonGroup
                  options={optionsExam}
                  selectedValue={selectedExamValue}
                  onChange={handleExamRadioChange}
                />
                {selectedExamValue === 'yes' ? (
                  <button onClick={createExam} className="trainingRadioUploadButton">
                    <FaUpload />
                    &nbsp;&nbsp;&nbsp;Add&nbsp;Exam
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="createInductionTrainingBodyrow">
              <div className="createInductionTrainingBodyrowlabel">Frequency</div>
              <div className="trainingRadioButton">
                <RadioButtonGroup
                  options={optionsFrequency}
                  selectedValue={selectedFrequencyValue}
                  onChange={handleFrequencyRadioChange}
                />
                {selectedFrequencyValue === 'once' ? (
                  <div className="fromDate">
                    <div>Date&nbsp;:</div>
                    <input
                      type="from"
                      name="from"
                      id="from"
                      value={formData.from}
                      onChange={handleDateChange}
                    />
                  </div>
                ) : (
                  <div className="fromDate">
                    <div className="fromDate">
                      <div>From&nbsp;:</div>
                      <input
                        type="from"
                        name="from"
                        id="from"
                        value={formData.from}
                        onChange={handleFromChange}
                      />
                    </div>
                    <div className="toDate">
                      <div>To&nbsp;:</div>
                      <input
                        type="to"
                        name="to"
                        id="to"
                        value={formData.to}
                        onChange={handleToChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="saveButtonInductionTraining">
              <div>
                <button onClick={handleSave}> Save </button>
              </div>
            </div>
          </div>
        </Card>
        <DialogBox
          isOpen={addMaterial}
          onClose={handleMaterialClose}
          onSave={handleUpload}
          title={'Add Material'}
        >
          <div className="createMaterialBody">
            {addNewMaterial ? (
              <>
                <div className="createMaterialBodyButton">
                  <button onClick={() => handleAddNewMaterial()}>Add Existing Material</button>
                </div>
                <div className="createInductionTrainingBodyrowlabel">New Material</div>
                <div className="trainingRadioButton">
                  <RadioButtonGroup
                    options={optionsMaterial}
                    selectedValue={selectedMaterialValue}
                    onChange={handleMaterialRadioChange}
                  />
                </div>
                <div>
                  <input type="file" accept=".pdf,video/*" onChange={handleFileChange} />
                </div>
              </>
            ) : (
              <>
                <div className="createMaterialBodyButton">
                  <button onClick={() => handleAddNewMaterial()}>Add New Material</button>
                </div>
                <SearchableTable columnLabels={columnLabels} columns={columns} data={data} />
              </>
            )}
          </div>
        </DialogBox>
      </div>
    </>
  );
};

export default Create;
