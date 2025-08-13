import React from 'react';
import Card from '../../components/card/card';
import DashboardCalendar from '../../components/calander/DashboardCalendar';

const Training: React.FC = () => {
  const events = [
    {
      date: new Date(2024, 7, 20),
      title: 'Team Meeting',
      description: 'Discuss project updates and upcoming tasks.',
    },
    {
      date: new Date(2024, 7, 22),
      title: 'Project Deadline',
      description: 'Complete and submit the project.',
    },
    {
      date: new Date(2024, 7, 25),
      title: 'Client Presentation',
      description: 'Present the project to the client.',
    },
  ];

  const review = [
    { Type: 'Review', description: 'Review is pending for induction training ID : 1' },
    { Type: 'Review', description: 'Review is pending for new training ID : 2' },
    { Type: 'Review', description: 'Review is pending for new training ID : 3' },
  ];

  const reschedule = [
    { Type: 'Training', description: '2 user has not complete training ID-3' },
    { Type: 'Training', description: 'Department ABC has not complete training ID-4' },
  ];

  return (
    <div className="training">
      <div className="header-band">Training</div>
      <div>
        <Card>
          <DashboardCalendar events={events} />
        </Card>
      </div>
      <div>
        <Card>
          Review
          <div>
            <ul>
              {review.map((notification, index) => (
                <li key={index}>
                  <strong>{notification.Type}:</strong> {notification.description}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
      <div>
        <Card>
          Re-schedule
          <div>
            <ul>
              {reschedule.map((notification, index) => (
                <li key={index}>
                  <strong>{notification.Type}:</strong> {notification.description}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Training;
