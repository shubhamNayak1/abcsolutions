import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MainDashboardCalendar.css';
import { MdClose } from 'react-icons/md';

interface Event {
  date: Date;
  title: string;
  description: string;
}

interface MainDashboardCalendarProps {
  events: Event[];
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const MainDashboardCalendar: React.FC<MainDashboardCalendarProps> = ({ events }) => {
  const [value, onChange] = useState<Value>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showHoverBox, setShowHoverBox] = useState(false); // Track visibility of hover box

  const handleDateClick = (selectedDate: Value) => {
    onChange(selectedDate);

    if (selectedDate instanceof Date) {
      const event = events.find(
        (event) => event.date.toDateString() === selectedDate.toDateString(),
      );
      if (event) {
        setSelectedEvent(event);
        setShowHoverBox(true); // Show hover box if an event is found
      } else {
        setSelectedEvent(null);
        setShowHoverBox(false); // Hide hover box if no event
      }
    } else {
      setSelectedEvent(null);
      setShowHoverBox(false); // Hide hover box
    }
  };

  const closeHoverBox = () => {
    setShowHoverBox(false); // Close the hover box
  };

  const tileContent = ({ date }: { date: Date }) => {
    const event = events.find((event) => event.date.toDateString() === date.toDateString());
    return event ? (
      <div className="event">
        <span>{event.title}</span>
      </div>
    ) : null;
  };

  return (
    <div className="main-dashboard-calendar">
      <Calendar onChange={handleDateClick} value={value} tileContent={tileContent} />

      {showHoverBox && selectedEvent && (
        <div className="hover-box">
          <div className="hover-box-header">
            <div className="hover-box-header-title">{selectedEvent.title}</div>
            <div className="hover-box-header-close">
              <MdClose size="small" className="hover-box-close-button" onClick={closeHoverBox} />
            </div>
          </div>
          <div className="hover-box-description">{selectedEvent.description}</div>
        </div>
      )}
    </div>
  );
};

export default MainDashboardCalendar;
