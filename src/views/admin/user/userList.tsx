import React, { useCallback, useEffect, useState } from 'react';
import SearchableTable from '../../../components/table/searchableTable';
import Card from '../../../components/card/card';
import './userList.css';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../../api/users';

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const columns = [
    'id',
    'userId',
    'username',
    'firstName',
    'lastName',
    'joiningDate',
    'email',
    'mobileNo',
  ];
  const columnLabels = {
    id: 'Id',
    userId: 'User Id',
    username: 'Username',
    firstName: 'First Name',
    lastName: 'Last Name',
    joiningDate: 'Joining Date',
    email: 'Email ID',
    mobileNo: 'Mobile No.',
  };

  const [dataTable, setDataTable] = useState<Record<string, any>[]>([]);

  const createUser = () => {
    navigate('create');
  };

  const loadUser = useCallback(async () => {
    try {
      const { data } = await getAllUsers();
      setDataTable(data);
      console.log('dataTable', dataTable);
    } catch {
      console.log('error');
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <div className="user">
        <div className="header-band">Users</div>
        <Card>
          <div className="createUserDiv">
            <button onClick={createUser} className="createUser">
              Create User
            </button>
          </div>
          <SearchableTable columnLabels={columnLabels} columns={columns} data={dataTable} />
        </Card>
      </div>
    </>
  );
};

export default UserList;
