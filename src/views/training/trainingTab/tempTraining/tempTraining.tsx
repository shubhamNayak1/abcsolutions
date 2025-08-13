import React, { useCallback, useEffect, useState } from 'react';
import Card from '../../../../components/card/card';
import { useNavigate } from 'react-router-dom';
import { getALLMaterial } from '../../../../api/training';

import './tempTraining.css';

const TempTraining: React.FC = () => {
  const navigate = useNavigate();
  const [trainee, setTrainee] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrainee(e.target.value);
  };

  const [data, setData] = useState<string[]>([]);

  const addData = (newItem: string) => {
    setData((prevData) => [...prevData, newItem]);
    setTrainee('');
  };

  return (
    <>
      <div className="tempTraining">
        <Card>
          <div className="createInductionTrainingBody">
            <div className="createInductionTrainingBodyrow">
              <div className="createInductionTrainingBodyrowlabel">Department Name</div>
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
                <input
                  type="text"
                  name="inductionTrainingName"
                  id="inductionTrainingName"
                  value=""
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
              <div className="createInductionTrainingBodyrowlabel">Date</div>
              <div>
                <input type="text" name="date" id="date" value="" />
              </div>
            </div>
            <div className="createInductionTrainingBodyrow">
              <div className="createInductionTrainingBodyrowlabel">Add Trainee</div>
              <div className="addTrainee">
                <input
                  type="text"
                  name="trainee"
                  id="trainee"
                  value={trainee}
                  onChange={handleChange}
                />{' '}
                <button className="addTraineeButton" onClick={() => addData(trainee)}>
                  {' '}
                  Add{' '}
                </button>
              </div>
            </div>
            {data.map((uesr, index) => (
              <div>{uesr}</div>
            ))}
            <div className="saveButtonInductionTraining">
              <div>
                <button> Save </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default TempTraining;
