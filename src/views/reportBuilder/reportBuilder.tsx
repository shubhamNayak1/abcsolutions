import React from 'react';
import SearchableTable from '../../components/table/searchableTable';
import Card from '../../components/card/card';
import DashCard from '../../components/dashCard/dashCard';
import './reportBuilder.css';

const ReportBuilder: React.FC = () => {
  const columns = ['ReportId', 'ReportName', 'ReportType', 'CreatedOn', 'Status'];
  const columnLabels = {
    ReportId: 'Report Id',
    ReportName: 'Report Name',
    ReportType: 'Report Type',
    CreatedOn: 'Created On',
    Status: 'Status',
  };
  const data = [
    {
      ReportId: '01',
      ReportName: 'ShubhamNayakTest',
      ReportType: 'QMS',
      CreatedOn: '10/July/2024',
      Status: 'Success',
    },
    {
      ReportId: '02',
      ReportName: 'TestReport',
      ReportType: 'User',
      CreatedOn: '08/July/2024',
      Status: 'Success',
    },
    {
      ReportId: '03',
      ReportName: 'QMStestReport',
      ReportType: 'QMS',
      CreatedOn: '10/June/2024',
      Status: 'Success',
    },
  ];
  return (
    <>
      <div className="reportBuilder">
        <div className="header-band">Reports</div>
        <div className="reportdashboardCardSection">
          <DashCard headerText="Total Report" headerColor="#0FA4AF">
            <div className="reportDashboardCard">
              <div className="reportDashboardCardHead">Create In Last Month</div>
              <div className="reportDashboardCardValue">24</div>
            </div>
          </DashCard>
          <DashCard headerText="User Report" headerColor="#964734">
            <div className="reportDashboardCard">
              <div className="reportDashboardCardHead">Create In Last Month</div>
              <div className="reportDashboardCardValue">8</div>
            </div>
          </DashCard>
          <DashCard headerText="QMS Report" headerColor="#2c92b4">
            <div className="reportDashboardCard">
              <div className="reportDashboardCardHead">Create In Last Month</div>
              <div className="reportDashboardCardValue">5</div>
            </div>
          </DashCard>
          <DashCard headerText="Audit Report" headerColor="#024950">
            <div className="reportDashboardCard">
              <div className="reportDashboardCardHead">Create In Last Month</div>
              <div className="reportDashboardCardValue">11</div>
            </div>
          </DashCard>
        </div>
        <Card>
          <SearchableTable columnLabels={columnLabels} columns={columns} data={data} />
        </Card>
      </div>
    </>
  );
};

export default ReportBuilder;
