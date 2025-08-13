import React, { useCallback, useEffect, useState } from 'react';
import Card from '../../../../components/card/card';
import './TNI.css';
import { toast } from 'react-toastify';
import TrainerDto from '../../../../dto/trainer';

const TNI: React.FC = () => {
  const dataTable = [
    { userId: 'shubh0001', username: 'snayak', email: 'snayak@gmail.com' },
    { userId: 'ajay0002', username: 'asingh', email: 'asingh@gmail.com' },
    { userId: 'javed0003', username: 'jkhan', email: 'jkhan@gmail.com' },
  ];

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
    { trainingId: 'DT-001', trainingname: 'Department Basic Training' },
    { trainingId: 'DT-002', trainingname: 'Department Code Of Conduct' },
    { trainingId: 'DT-003', trainingname: 'Department Policy' },
    { trainingId: 'DT-003', trainingname: 'Department Equipment Material' },
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

  return (
    <>
      <div className="tni">
        <div className="header-band">TNI</div>
        <Card>
          <div className="createInductionTrainingHeader">Assign Training</div>
          <div className="createInductionTrainingBody">
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
      </div>
    </>
  );
};
export default TNI;
