import React, { useCallback, useEffect, useState } from 'react';
import Card from '../../../../components/card/card';
import './NewUserInduction.css';
import RadioButtonGroup from '../../../../components/radioButtonGroup/RadioButtonGroup';
import { FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DialogBox from '../../../../components/dialogBox/dialogBox';
import SearchableTable from '../../../../components/table/searchableTable';
import axios, { AxiosResponse } from 'axios';
import { getALLMaterial, uploadFile } from '../../../../api/training';
import { toast } from 'react-toastify';
import TrainerDto from '../../../../dto/trainer';

const NewUserInduction: React.FC = () => {
  const navigate = useNavigate();

  const dataTable = [
    { userId: 'shubh0001', username: 'snayak', email: 'snayak@gmail.com' },
    { userId: 'ajay0002', username: 'asingh', email: 'asingh@gmail.com' },
    { userId: 'javed0003', username: 'jkhan', email: 'jkhan@gmail.com' },
  ];

  const createExam = () => {
    navigate('add-exam');
  };

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

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

  const [selectedExamValue, setSelectedExamValue] = useState<string>('yes');

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
  };

  const [formExternalData, setFormExternalData] = useState<TrainerDto>({
    personName: '',
    vendorId: -1,
    mobileNo: '',
    emailId: '',
    type: 'external',
  });

  const handleExternalChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormExternalData({ ...formExternalData, [name]: value });
    console.log(name + value);
  };

  const [formTrainingData, setFormTrainingData] = useState<string>();
  const dataTrainingTable = [
    { trainingId: 'IN-001', trainingname: 'Dress Code Policy' },
    { trainingId: 'IN-002', trainingname: 'Office Timing' },
  ];

  const handleTrainingChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormTrainingData(value);
    console.log(name + value);
  };

  const [formTrainingDataMultiple, setFormTrainingDataMultiple] = useState<string[]>([]);

  const handleAssignPolicy = () => {
    if (formTrainingData) {
      setFormTrainingDataMultiple((prevState) => [...prevState, formTrainingData]);
    }
  };

  const [internalTrainer, setInternalTrainer] = useState(false);

  const handleInternalTrainerOpen = () => {
    setInternalTrainer(true);
  };

  const handleInternalTrainerClose = () => {
    setInternalTrainer(false);
  };

  return (
    <>
      <div className="newuserinduction">
        <div className="header-band">Induction Training</div>
        <Card>
          <div className="createInductionTrainingHeader">Assign Induction Training</div>
          <div className="createInductionTrainingBody">
            <div className="saveButtonInductionTraining">
              <div>
                <button onClick={() => handleInternalTrainerOpen()}>
                  {' '}
                  Create Induction Training{' '}
                </button>
              </div>
            </div>
            <div className="createInductionTrainingBodyrow">
              <div className="createInductionTrainingBodyrowlabel">User Name</div>
              <div>
                <select
                  name="vendorId"
                  value={formExternalData.vendorId}
                  onChange={handleExternalChange}
                >
                  <option value="">Select User Name</option>
                  {dataTable.map((ven) => (
                    <option key={ven.userId} value={ven.userId}>
                      {ven.username}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="createInductionTrainingBodyrow">
              <div className="createInductionTrainingBodyrowlabel">Induction Training</div>
              <div>
                <select name="training" value={formTrainingData} onChange={handleTrainingChange}>
                  <option value="">Select Training</option>
                  {dataTrainingTable.map((ven) => (
                    <option key={ven.trainingId} value={ven.trainingId}>
                      {ven.trainingname}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="saveButtonInductionTraining">
              <div>
                <button onClick={() => handleAssignPolicy()}> Assign </button>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="createInductionTrainingHeader">Assigned Training</div>
          <div>
            {formTrainingDataMultiple.map((trainingId) => {
              // Find the corresponding training object by trainingId
              const training = dataTrainingTable.find((item) => item.trainingId === trainingId);

              // If training is found, display its trainingname in a div
              if (training) {
                return (
                  <div className="trainingname" key={trainingId}>
                    {training.trainingname}
                  </div>
                );
              }

              return null; // If training is not found, return null
            })}
          </div>
        </Card>
        <DialogBox
          isOpen={internalTrainer}
          onClose={handleInternalTrainerClose}
          onSave={handleInternalTrainerClose}
          title={'Create Induction Training'}
        >
          <div className="createInductionTrainingBody">
            <div className="createInductionTrainingBodyrow">
              <div className="createInductionTrainingBodyrowlabel">Training Name</div>
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
              <div className="createInductionTrainingBodyrowlabel">Training Type</div>
              <div>
                <input
                  type="text"
                  name="inductionTrainingName"
                  id="inductionTrainingName"
                  value="Induction"
                />
              </div>
            </div>
            <div className="createInductionTrainingBodyrow">
              <div className="createInductionTrainingBodyrowlabel">Trainer</div>
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
              <div className="createInductionTrainingBodyrowlabel">Co-ordinator</div>
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
          </div>
        </DialogBox>
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

export default NewUserInduction;
