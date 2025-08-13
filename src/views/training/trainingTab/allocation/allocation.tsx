import React, { useCallback, useEffect, useState } from 'react';
import Card from '../../../../components/card/card';
import SearchableTable from '../../../../components/table/searchableTable';
import './allocation.css';
import DialogBox from '../../../../components/dialogBox/dialogBox';
import { getAllDepartment } from '../../../../api/department';
import { getAllUsers } from '../../../../api/users';

const Allocation: React.FC = () => {
  const [dataTable, setDataTable] = useState<Record<string, any>[]>([]);
  const [dataUserTable, setDataUserTable] = useState<Record<string, any>[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [department, setDepartment] = useState<string[]>([]);

  useEffect(() => {
    const departmentNames = dataTable.map((item) => item.departmentName);
    setDepartment(departmentNames);
  }, [dataTable]);

  useEffect(() => {
    const userNames = dataUserTable.map((item) => item.username);
    setUsers(userNames);
  }, [dataUserTable]);

  const loadDepartment = useCallback(async () => {
    try {
      const { data } = await getAllDepartment();
      setDataTable(data);
    } catch {
      console.log('error');
    }
  }, []);

  const loadUser = useCallback(async () => {
    try {
      const { data } = await getAllUsers();
      setDataUserTable(data);
    } catch {
      console.log('error');
    }
  }, []);

  const [formData, setFormData] = useState({
    user: '',
    department: '',
    justification: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    loadDepartment();
    loadUser();
  }, []);

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
      <div className="allocation">
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
          // <Card onClose={closeDialog} onSave={closeDialog} title={'Assign Training'}>
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
              <div>
                <div className="createInductionTrainingBodyrow">
                  <div className="createInductionTrainingBodyrowlabel">Select Department</div>
                  <select name="department" value={formData.department} onChange={handleChange}>
                    <option value="">Select Department</option>
                    {department.map((depart) => (
                      <option key={depart} value={depart}>
                        {depart}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="createInductionTrainingBodyrow">
                  <div className="createInductionTrainingBodyrowlabel">Select Users</div>
                  <select name="user" value={formData.user} onChange={handleChange}>
                    <option value="">Select User</option>
                    {users.map((user) => (
                      <option key={user} value={user}>
                        {user}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="createInductionTrainingBodyrow">
                <button onClick={closeDialog}>Assign</button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

export default Allocation;
