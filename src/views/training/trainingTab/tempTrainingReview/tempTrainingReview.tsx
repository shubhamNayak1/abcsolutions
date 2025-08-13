import React, { useState } from 'react';
import Card from '../../../../components/card/card';
import SearchableTable from '../../../../components/table/searchableTable';
import DialogBox from '../../../../components/dialogBox/dialogBox';

import './tempTrainingReview.css';

const TempTrainingReview: React.FC = () => {
  const trainee = [
    { id: 1, traineeName: 'Ajay' },
    { id: 2, traineeName: 'Shubham' },
    { id: 3, traineeName: 'Javed' },
    { id: 4, traineeName: 'Aditya' },
  ];

  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);

  const handleCheckboxChange = (id: number) => {
    setSelectedDepartments((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((deptId) => deptId !== id)
        : [...prevSelected, id],
    );
  };

  const columns = [
    'TrainingName',
    'TrainingType',
    'TrainingSubType',
    'Location',
    'Date',
    'Trainer',
    'Coordinator',
  ];
  const columnLabels = {
    TrainingName: 'Training Name',
    TrainingType: 'Training Type',
    TrainingSubType: 'Training Sub Type',
    Location: 'Location',
    Date: 'Date',
    Trainer: 'Trainer',
    Coordinator: 'Coordinator',
  };
  const data = [
    {
      TrainingName: 'HR Induction',
      TrainingType: 'Induction',
      TrainingSubType: '-',
      Location: 'Pune',
      Date: '24/8/2024',
      Trainer: 'Ajay',
      Coordinator: 'Shubham',
    },
    {
      TrainingName: 'Monthly Policy',
      TrainingType: 'Self',
      TrainingSubType: 'Policy',
      Location: 'Goa',
      Date: '24/8/2024',
      Trainer: '-',
      Coordinator: 'Shubham',
    },
    {
      TrainingName: 'Yearly',
      TrainingType: 'Training',
      TrainingSubType: 'Revise',
      Location: 'Pune',
      Date: '24/8/2024',
      Trainer: 'Javed',
      Coordinator: 'Javed',
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
      <div className="tempTrainingReview">
        <Card>
          <div>
            <SearchableTable
              columnLabels={columnLabels}
              columns={columns}
              data={data}
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
                    <strong>{columnLabels[key as keyof typeof columnLabels]}:</strong> {value}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                ))}
              </div>
            </div>
            <div className="cloumnDialogJustification">
              <input type="text" placeholder="Justification"></input>
            </div>
            <div>
              {trainee.map((uesr, index) => (
                <div className="cloumnDialoglabel">
                  <div className="cloumnDialogDivlabel">{uesr.traineeName}</div>
                </div>
              ))}
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

export default TempTrainingReview;
