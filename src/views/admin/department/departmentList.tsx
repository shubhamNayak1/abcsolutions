import React, { useCallback, useEffect, useState } from 'react';
import SearchableTable from '../../../components/table/searchableTable';
import Card from '../../../components/card/card';
import { useNavigate } from 'react-router-dom';
import './departmentList.css';
import DashCard from '../../../components/dashCard/dashCard';
import { getAllDepartment } from '../../../api/department';
import { getAllUsers } from '../../../api/users';

const DepartmentList: React.FC = () => {
  const navigate = useNavigate();
  const columns = ['departmentName', 'departmentShortCode'];
  const columnLabels = {
    departmentName: 'Department Name',
    departmentShortCode: 'Department Short Code',
  };
  const [dataTable, setDataTable] = useState<Record<string, any>[]>([]);
  const [dataUserTable, setDataUserTable] = useState<Record<string, any>[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [department, setDepartment] = useState<string[]>([]);

  const loadUser = useCallback(async () => {
    try {
      const { data } = await getAllUsers();
      setDataUserTable(data);
    } catch {
      console.log('error');
    }
  }, []);

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

  useEffect(() => {
    loadDepartment();
    loadUser();
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

  const handleClear = () => {
    setFormData({
      user: '',
      department: '',
      justification: '',
    });
  };

  const handleSave = () => {
    console.log('User:', formData.user);
    console.log('Department:', formData.department);
    console.log('justification', formData.justification);
  };

  const handleCreateDepartment = () => {
    navigate('create');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, justification: event.target.value }));
  };

  return (
    <>
      <div className="department">
        <div className="header-band">Departments</div>
        <div className="dept-card">
          <DashCard headerText="Add User to Department" headerColor="#0FA4AF">
            <form>
              <div className="form-group">
                <label>User</label>
                <select name="user" value={formData.user} onChange={handleChange}>
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Department</label>
                <select name="department" value={formData.department} onChange={handleChange}>
                  <option value="">Select Department</option>
                  {department.map((depart) => (
                    <option key={depart} value={depart}>
                      {depart}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Remark/Justification</label>
                <input
                  type="text"
                  value={formData.justification}
                  onChange={handleInputChange}
                  placeholder="Justification..."
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={handleClear}>
                  Clear
                </button>
                <button type="button" onClick={handleSave}>
                  Save
                </button>
              </div>
            </form>
          </DashCard>
        </div>
        <Card>
          <div className="createDepartmentDiv">
            <button onClick={handleCreateDepartment} className="createDepartment">
              Create Department
            </button>
          </div>
          <SearchableTable columnLabels={columnLabels} columns={columns} data={dataTable} />
        </Card>
      </div>
    </>
  );
};

export default DepartmentList;
