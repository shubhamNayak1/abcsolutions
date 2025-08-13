import React, { useState } from 'react';
import Card from '../../../../components/card/card';
import SearchableTable from '../../../../components/table/searchableTable';
import DialogBox from '../../../../components/dialogBox/dialogBox';

import './exam.css';

const Exam: React.FC = () => {
  const departments = [
    { id: 1, departmentName: 'HR' },
    { id: 2, departmentName: 'IT' },
    { id: 3, departmentName: 'Finance' },
    { id: 4, departmentName: 'Marketing' },
    { id: 5, departmentName: 'Sales' },
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
      <div className="exam">
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
          </Card>
        )}
      </div>
    </>
  );
};

export default Exam;
