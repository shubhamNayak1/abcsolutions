import React, { useState } from 'react';
import BarChart from '../../components/highChart/barChart';
import HorizontalBarChart from '../../components/highChart/horizontalBarChart';
import './dashboard.css';
import DashCard from '../../components/dashCard/dashCard';
import SearchableTable from '../../components/table/searchableTable';
import Card from '../../components/card/card';
import MainDashboardCalendar from '../../components/mainCalander/MainDashboardCalendar';
import { AiFillNotification } from 'react-icons/ai';

const Dashboard: React.FC = () => {
  const [notification, setNotification] = useState(true);

  const [notificationList, setNotificationList] = useState<Record<string, any>[]>([]);

  const hardNotification = [
    { Type: 'Training', description: 'Depart Traing ID-3 is pending' },
    { Type: 'Password', description: 'Password is going to expire in 5 days' },
    { Type: 'Review', description: 'Review is pending for induction training' },
  ];

  // setNotificationList(
  //   hardNotification
  // )

  const events = [
    {
      date: new Date(2024, 7, 20),
      title: 'Team Meeting',
      description: 'Discuss project updates and upcoming tasks.',
    },
    {
      date: new Date(2024, 7, 25),
      title: 'Client Presentation',
      description: 'Present the project to the client.',
    },
  ];

  const barChartSeries = [
    {
      name: 'Series 1',
      data: [1, 2, 3],
      type: 'column' as const,
    },
  ];

  const horizontalBarChartSeries = [
    {
      name: 'Series 1',
      data: [1, 2, 3],
      type: 'bar' as const,
    },
  ];

  const columns = ['Name', 'Age', 'Country'];
  const columnLabels = { Name: 'Name', Age: 'Age', Country: 'Country' };
  const data = [
    { Name: 'John Doe', Age: 28, Country: 'USA' },
    { Name: 'Jane Smith', Age: 34, Country: 'UK' },
    { Name: 'Kumar Patel', Age: 40, Country: 'India' },
  ];

  return (
    <>
      <div className="dashboard">
        <div className="header-band">Dashboard</div>
        {notification ? (
          <div className="notification">
            <Card>
              <div className="notiCardHeader">
                <AiFillNotification color="#f54266" />
                <div className="notiCardHeaderText">Notification</div>
                <div>
                  <ul>
                    {hardNotification.map((notification, index) => (
                      <li key={index}>
                        <strong>{notification.Type}:</strong> {notification.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <></>
        )}
        <div className="dashboard">
          <div className="firstRow">
            <div className="cardColoumn">
              <div className="dashboardCardSection">
                <DashCard headerText="Training Review Pending" headerColor="#0FA4AF">
                  <div className="dashboardCard">First Card description</div>
                </DashCard>
                <DashCard headerText="Training Compliance Pending" headerColor="#964734">
                  <div className="dashboardCard">Second Card description</div>
                </DashCard>
                <DashCard headerText="Online Exam Pending" headerColor="#2c92b4">
                  <div className="dashboardCard">Third Card description</div>
                </DashCard>
              </div>
              <div className="dashboardCardSection">
                <DashCard headerText="Training Completed" headerColor="#0FA4AF">
                  <div className="dashboardCard">First Card description</div>
                </DashCard>
                <DashCard headerText="100% Compliance Completed" headerColor="#964734">
                  <div className="dashboardCard">Second Card description</div>
                </DashCard>
                <DashCard headerText="Online Exam Completed" headerColor="#2c92b4">
                  <div className="dashboardCard">third Card description</div>
                </DashCard>
              </div>
            </div>
            <div className="cardCalander">
              <Card>
                <div className="cardCalanderHeader">Meeting Calander</div>
                <MainDashboardCalendar events={events} />
              </Card>
            </div>
          </div>
          {/* <BarChart
            title="Bar Chart Example"
            xAxis={['Category 1', 'Category 2', 'Category 3']}
            series={barChartSeries}
          />
          <HorizontalBarChart
            title="Horizontal Bar Chart Example"
            xAxis={['Category 1', 'Category 2', 'Category 3']}
            series={horizontalBarChartSeries}
          /> */}
          <Card>
            <SearchableTable columnLabels={columnLabels} columns={columns} data={data} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
