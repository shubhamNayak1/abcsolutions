import React from 'react';
import './dialogBox.css';

interface DialogBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  children: React.ReactNode;
}

const DialogBox: React.FC<DialogBoxProps> = ({ isOpen, onClose, onSave, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <div className="dialog-header">
          <h2>{title}</h2>
        </div>
        <div className="dialog-body">{children}</div>
        <div className="dialog-footer">
          <button onClick={onClose} className="dialog-button cancel-button">
            Cancel
          </button>
          <button onClick={onSave} className="dialog-button save-button">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
