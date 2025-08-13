import React, { ReactNode } from 'react';
import './dashCard.css';

interface DashCardProps {
  headerText: string;
  headerColor: string;
  children: ReactNode;
}

const DashCard: React.FC<DashCardProps> = ({ headerText, headerColor, children }) => {
  return (
    <div className="dash-card">
      <div className="dash-card-header" style={{ backgroundColor: headerColor }}>
        {headerText}
      </div>
      <div className="dash-card-body">{children}</div>
    </div>
  );
};

export default DashCard;
