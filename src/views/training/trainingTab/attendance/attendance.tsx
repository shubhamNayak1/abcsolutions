import React, { useState } from 'react';
import Card from '../../../../components/card/card';
import SearchableTable from '../../../../components/table/searchableTable';
import './attendance.css';
import DialogBox from '../../../../components/dialogBox/dialogBox';

const Attendance: React.FC = () => {
  const User = [
    { id: 1, userName: 'snayak' },
    { id: 2, userName: 'asingh' },
    { id: 3, userName: 'jkhan' },
    { id: 4, userName: 'abhargav' },
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
    'Frequency',
    'From',
    'To',
    'Trainer',
    'Coordinator',
  ];
  const columnLabels = {
    TrainingName: 'Training Name',
    TrainingType: 'Training Type',
    TrainingSubType: 'Training Sub Type',
    Frequency: 'Frequency',
    From: 'From',
    To: 'To',
    Trainer: 'Trainer',
    Coordinator: 'Coordinator',
  };
  const data = [
    {
      TrainingName: 'HR Induction',
      TrainingType: 'Induction',
      TrainingSubType: '-',
      Frequency: 'Once',
      From: '24/8/2024',
      To: '24/8/2024',
      Trainer: 'Ajay',
      Coordinator: 'Shubham',
    },
    {
      TrainingName: 'Monthly Policy',
      TrainingType: 'Self',
      TrainingSubType: 'Policy',
      Frequency: 'Monthly',
      From: '24/8/2024',
      To: '24/8/2025',
      Trainer: '-',
      Coordinator: 'Shubham',
    },
    {
      TrainingName: 'Yearly',
      TrainingType: 'Training',
      TrainingSubType: 'Revise',
      Frequency: 'Yearly',
      From: '24/8/2024',
      To: '24/8/2026',
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
      <div className="attendance">
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
            <div className="cloumnDialog">
              <div className="cloumnDialogDiv">
                {User.map((uesr, index) => (
                  <label key={index}>
                    <input type="checkbox" />
                    {uesr.userName}
                  </label>
                ))}
              </div>
            </div>
            <div className="createButtonExam">
              <div>
                <button> Save </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

export default Attendance;
