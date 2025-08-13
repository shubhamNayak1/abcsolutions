import React from 'react';
import Tab from '../../../components/tabs/Tab';
import Create from './create/Create';
import Allocation from './allocation/allocation';
import Attendance from './attendance/attendance';
import Reschedule from './reschedule/reschedule';
import TempTraining from './tempTraining/tempTraining';
import TempTrainingReview from './tempTrainingReview/tempTrainingReview';

const TrainingTab: React.FC = () => {
  const tabs = [
    { label: 'Create', content: <Create /> },
    { label: 'Allocate', content: <Allocation /> },
    { label: 'Attendance', content: <Attendance /> },
    { label: 'Reschedule', content: <Reschedule /> },
    { label: 'Temporary Staff', content: <TempTraining /> },
    { label: 'Temporary Staff Review', content: <TempTrainingReview /> },
  ];

  return (
    <div className="tab" style={{ padding: '8px' }}>
      <Tab tabs={tabs} />
    </div>
  );
};

export default TrainingTab;
