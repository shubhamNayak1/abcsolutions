import React from 'react';
import Tab from '../../../components/tabs/Tab';
import YourTraining from './yourTraining/yourTraining';
import Exam from './exam/exam';
import Evaluation from './evaluation/evaluation';
import EmployeeCompliance from './employeeCompliance/employeeCompliance';
import ComplianceReview from './ComplianceReview/complianceReview';

const Compliance: React.FC = () => {
  const tabs = [
    { label: 'Self Training Compliance', content: <YourTraining /> },
    { label: 'Exam', content: <Exam /> },
    { label: 'Employee Compliance', content: <EmployeeCompliance /> },
    { label: 'Evaluation', content: <Evaluation /> },
    { label: 'Compliance Review', content: <ComplianceReview /> },
  ];

  return (
    <div className="tab" style={{ padding: '8px' }}>
      <Tab tabs={tabs} />
    </div>
  );
};

export default Compliance;
