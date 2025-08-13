import React, { useState } from 'react';
import Card from '../../../../components/card/card';
import SearchableTable from '../../../../components/table/searchableTable';
import DialogBox from '../../../../components/dialogBox/dialogBox';
import './complianceReview.css';

const ComplianceReview: React.FC = () => {
  const User = [
    { id: 1, userName: 'snayak', justification: 'Training was completed and very usefull' },
    { id: 2, userName: 'asingh', justification: 'NA' },
    { id: 3, userName: 'jkhan', justification: 'Training was very informative' },
    { id: 4, userName: 'abhargav', justification: 'Training was very informative' },
  ];

  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);

  const handleCheckboxChange = (id: number) => {
    setSelectedDepartments((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((deptId) => deptId !== id)
        : [...prevSelected, id],
    );
  };

  const columnsYour = ['TrainingName', 'TrainingType', 'TrainingSubType', 'Date', 'Trainer'];
  const columnYourLabels = {
    TrainingName: 'Training Name',
    TrainingType: 'Training Type',
    TrainingSubType: 'Training Sub Type',
    Date: 'Date',
    Trainer: 'Trainer',
  };
  const dataYour = [
    {
      TrainingName: 'HR Induction',
      TrainingType: 'Induction',
      TrainingSubType: '-',
      Date: '30/8/2024',
      Trainer: 'Ajay',
    },
    {
      TrainingName: 'Monthly Policy Training',
      TrainingType: 'Self',
      TrainingSubType: 'Policy',
      Date: '30/8/2024',
      Trainer: '-',
    },
  ];

  const [selectedRow, setSelectedRow] = useState<{ [key: string]: any } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTrainingNameClick = (row: { [key: string]: any }) => {
    setSelectedRow(row);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedRow(null);
  };

  return (
    <>
      <div className="complianceReview">
        <Card>
          <div>
            <SearchableTable
              columnLabels={columnYourLabels}
              columns={columnsYour}
              data={dataYour}
              onTrainingNameClick={handleTrainingNameClick}
            />
          </div>
        </Card>
        {isDialogOpen && selectedRow && (
          <Card>
            <div className="cloumnDialog">
              <div className="cloumnDialogDiv">
                {Object.entries(selectedRow).map(([key, value]) => (
                  <p key={key}>
                    <strong>{columnYourLabels[key as keyof typeof columnYourLabels]}:</strong>{' '}
                    {value}&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                ))}
              </div>
            </div>
            <div>
              <div>
                {User.map((uesr, index) => (
                  <div className="cloumnDialoglabel">
                    <label key={index} className="cloumnDialogDivlabel">
                      <input type="checkbox" />
                    </label>
                    <div className="cloumnDialogDivlabel">{uesr.userName}</div>
                    <div className="cloumnDialogDivlabel">{uesr.justification}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="createButtonExam">
              <button onClick={closeDialog}>Submit</button>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

export default ComplianceReview;
