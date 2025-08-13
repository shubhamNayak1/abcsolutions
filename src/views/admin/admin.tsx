import React, { useCallback, useEffect, useState } from 'react';
import DashCard from '../../components/dashCard/dashCard';
import BarChart from '../../components/highChart/barChart';
import './admin.css';
import { getAllDepartmentCount } from '../../api/department';
import { AxiosResponse } from 'axios';
import { getAllUsersCount } from '../../api/users';
import { getAllUserGroupCount } from '../../api/userGroup';

const Admin: React.FC = () => {
  const [totalUser, setTotalUser] = useState(19);
  const [totalUserGroup, setTotalUserGroup] = useState(7);
  const [totalDepartment, setTotalDepartment] = useState(8);

  const loadDepartmentCount = useCallback(async () => {
    getAllDepartmentCount()
      .then((response: AxiosResponse) => {
        setTotalDepartment(response.data);
      })
      .catch((error) => {
        console.error('Error While fetching department count. Please try again.');
      });
  }, []);

  const loadUser = useCallback(async () => {
    getAllUsersCount()
      .then((response: AxiosResponse) => {
        setTotalUser(response.data);
      })
      .catch((error) => {
        console.error('Error While fetching User count. Please try again.');
      });
  }, []);

  const loadUserGroup = useCallback(async () => {
    getAllUserGroupCount()
      .then((response: AxiosResponse) => {
        setTotalUserGroup(response.data);
      })
      .catch((error) => {
        console.error('Error While fetching User Group count. Please try again.');
      });
  }, []);

  useEffect(() => {
    loadDepartmentCount();
    loadUser();
    loadUserGroup();
  }, []);

  const userbarChartSeries = [
    {
      name: 'Users',
      data: [totalUser, 2, 17, 3],
      type: 'column' as const,
    },
  ];
  const userGroupbarChartSeries = [
    {
      name: 'Group',
      data: [totalUserGroup, 1, 8, 2],
      type: 'column' as const,
    },
  ];
  const departmentbarChartSeries = [
    {
      name: 'Department',
      data: [totalDepartment, 0, 7, 1],
      type: 'column' as const,
    },
  ];
  return (
    <>
      <div className="admin">
        <div className="p-1 text-xl font-bold">User Managment</div>
        <div className="sub-header-band">Users :</div>
        <div className="dashboard">
          <div className="dashboardCardSection">
            <DashCard headerText="Total User" headerColor="#0FA4AF">
              <div className="subTextDescription">{totalUser}</div>
            </DashCard>
            <DashCard headerText="New User" headerColor="#964734">
              <div className="subTextNewDescription">2</div>
            </DashCard>
            <DashCard headerText="Active User" headerColor="#2c92b4">
              <div className="subTextDescription">17</div>
            </DashCard>
            <DashCard headerText="Deactive User" headerColor="#024950">
              <div className="subTextDeactiveDescription">3</div>
            </DashCard>
          </div>
        </div>
        <div>
          <BarChart
            title="Department Wise User"
            xAxis={['Total User', 'New User', 'Active User', 'Deactive User']}
            series={userbarChartSeries}
          />
        </div>
        <div className="sub-header-band">Groups :</div>
        <div className="dashboard">
          <div className="dashboardCardSection">
            <DashCard headerText="Total Group" headerColor="#0FA4AF">
              <div className="subTextDescription">{totalUserGroup}</div>
            </DashCard>
            <DashCard headerText="New Group" headerColor="#964734">
              <div className="subTextNewDescription">1</div>
            </DashCard>
            <DashCard headerText="Active Group" headerColor="#2c92b4">
              <div className="subTextDescription">8</div>
            </DashCard>
            <DashCard headerText="Deactive Group" headerColor="#024950">
              <div className="subTextDeactiveDescription">2</div>
            </DashCard>
          </div>
        </div>
        <div>
          <BarChart
            title="Group"
            xAxis={['Total Group', 'New Group', 'Active Group', 'Deactive Group']}
            series={userGroupbarChartSeries}
          />
        </div>
        <div className="sub-header-band">Department :</div>
        <div className="dashboard">
          <div className="dashboardCardSection">
            <DashCard headerText="Total Department" headerColor="#0FA4AF">
              <div className="subTextDescription">{totalDepartment}</div>
            </DashCard>
            <DashCard headerText="New Department" headerColor="#964734">
              <div className="subTextNewDescription">0</div>
            </DashCard>
            <DashCard headerText="Active Department" headerColor="#2c92b4">
              <div className="subTextDescription">7</div>
            </DashCard>
            <DashCard headerText="Deactive Department" headerColor="#024950">
              <div className="subTextDeactiveDescription">1</div>
            </DashCard>
          </div>
        </div>
        <div>
          <BarChart
            title="Department"
            xAxis={['Total Deparment', 'New Deparment', 'Active Deparment', 'Deactive Deparment']}
            series={departmentbarChartSeries}
          />
        </div>
      </div>
    </>
  );
};

export default Admin;
