import React, { useCallback, useEffect, useState } from 'react';
import SearchableTable from '../../../components/table/searchableTable';
import './userGroupList.css';
import Card from '../../../components/card/card';
import DashCard from '../../../components/dashCard/dashCard';
import { useNavigate } from 'react-router-dom';
import { getAllUserGroup } from '../../../api/userGroup';
import { getAllUsers } from '../../../api/users';

const UserGroupList: React.FC = () => {
  const navigate = useNavigate();

  const columns = ['groupName', 'groupDescription'];
  const columnLabels = { groupName: 'Group Name', groupDescription: 'Group Description' };

  const [dataTable, setDataTable] = useState<Record<string, any>[]>([]);
  const [dataUserTable, setDataUserTable] = useState<Record<string, any>[]>([]);
  const [group, setGroup] = useState<string[]>([]);
  const [users, setUsers] = useState<string[]>([]);

  const loadUserGroup = useCallback(async () => {
    try {
      const { data } = await getAllUserGroup();
      setDataTable(data);
    } catch {
      console.log('error');
    }
  }, []);

  useEffect(() => {
    loadUserGroup();
    loadUser();
  }, []);

  useEffect(() => {
    const groupNames = dataTable.map((item) => item.groupName);
    setGroup(groupNames);
  }, [dataTable]);

  const loadUser = useCallback(async () => {
    try {
      const { data } = await getAllUsers();
      setDataUserTable(data);
    } catch {
      console.log('error');
    }
  }, []);

  useEffect(() => {
    const userNames = dataUserTable.map((item) => item.username);
    setUsers(userNames);
  }, [dataUserTable]);

  const [formData, setFormData] = useState({
    user: '',
    group: '',
    justification: '',
  });

  const handleChangeJustification = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClear = () => {
    setFormData({
      user: '',
      group: '',
      justification: '',
    });
  };

  const handleSave = () => {
    console.log('User:', formData.user);
    console.log('Department:', formData.group);
  };

  const handleCreateGroup = () => {
    navigate('create');
  };

  return (
    <>
      <div className="userGroup">
        <div className="header-band">Groups</div>
        <div className="user-group-card">
          <DashCard headerText="Add User to Group" headerColor="#0FA4AF">
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
                <label>Group</label>
                <select name="group" value={formData.group} onChange={handleChange}>
                  <option value="">Select Group</option>
                  {group.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="justification">Remark/Justification</label>
                <input
                  type="text"
                  name="justification"
                  id="justification"
                  value={formData.justification}
                  onChange={handleChangeJustification}
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
        <div className="user-group-list-container">
          <Card>
            <div className="createUserGroupDiv">
              <button onClick={handleCreateGroup} className="createUserGroup">
                Create Group
              </button>
            </div>
            <SearchableTable columnLabels={columnLabels} columns={columns} data={dataTable} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default UserGroupList;
