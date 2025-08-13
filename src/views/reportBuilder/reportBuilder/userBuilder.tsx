import React, { useState } from 'react';
import Card from '../../../components/card/card';
import './userBuilder.css';
import RadioButtonGroup from '../../../components/radioButtonGroup/RadioButtonGroup';

const ReportBuilderUser: React.FC = () => {
  const [selectedExamValue, setSelectedExamValue] = useState<string>('training');

  const handleExamRadioChange = (value: string) => {
    setSelectedExamValue(value);
  };

  const [selectedReportValue, setSelectedReportValue] = useState<string>('training');

  const handleReportRadioChange = (value: string) => {
    setSelectedReportValue(value);
  };

  const [selectedTrainingValue, setSelectedTrainingValue] = useState<string>('training');

  const handleTrainingRadioChange = (value: string) => {
    setSelectedTrainingValue(value);
  };

  const optionsExam = [
    { label: 'Training-wise', value: 'training' },
    { label: 'User-wise', value: 'user' },
  ];

  const trainigList = [
    { label: 'Training Scheduled', value: 'tms' },
    { label: 'Training Inprogress', value: 'tmip' },
    { label: 'Training Completed', value: 'tmc' },
  ];

  const userReportList = [
    { label: 'Complete User List', value: 'comUser' },
    { label: 'Active User List', value: 'acUser' },
    { label: 'Deactive User List', value: 'deUser' },
    { label: 'Active Department List', value: 'acDeptUser' },
    { label: 'Deactive Department List', value: 'deDeptUser' },
  ];
  return (
    <>
      <div className="userReport">
        <div className="header-band">Create Report</div>
        <Card>
          <div className="createTrainingTypeBodyrow">
            <div className="createTrainingTypeBodyrowlabel">Report Name</div>
            <input type="text" name="name" id="sectionName" value="" />
          </div>
          <div className="createTrainingTypeBodyrow">
            <div className="createTrainingTypeBodyrowlabel">Starting Date</div>
            <input type="text" name="name" id="sectionName" value="" />
          </div>
          <div className="createTrainingTypeBodyrow">
            <div className="createTrainingTypeBodyrowlabel">End Date</div>
            <input type="text" name="name" id="sectionName" value="" />
          </div>
          <div className="createInductionTrainingBodyrow">
            <div className="createInductionTrainingBodyrowlabel">Report Type</div>
            <div className="trainingRadioButton">
              <RadioButtonGroup
                options={optionsExam}
                selectedValue={selectedExamValue}
                onChange={handleExamRadioChange}
              />
            </div>
          </div>
          <div>
            {selectedExamValue === 'training' ? (
              <>
                <div className="createInductionTrainingBodyrow">
                  <div className="createInductionTrainingBodyrowlabel">Select Report Type</div>
                  <div className="trainingRadioButton">
                    <RadioButtonGroup
                      options={trainigList}
                      selectedValue={selectedTrainingValue}
                      onChange={handleTrainingRadioChange}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="createInductionTrainingBodyrow">
                  <div className="createInductionTrainingBodyrowlabel">Select Report Type</div>
                  <div className="trainingRadioButton">
                    <RadioButtonGroup
                      options={userReportList}
                      selectedValue={selectedReportValue}
                      onChange={handleReportRadioChange}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="saveButtonTraining">
            <div>
              <button> Download </button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ReportBuilderUser;
