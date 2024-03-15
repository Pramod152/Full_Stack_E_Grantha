//  DeleteConfirmationDialog.jsx
import React from 'react';
import './ComponentCSS/DeleteConfirmationDialog.css'; // Import CSS file for dialog styling

const DeleteConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
  return (
    <div className={`confirmation_dialog ${isOpen ? 'open' : ''}`}>
      <div className="dialog_content">
        <h2>Are you sure you want to delete this course?</h2>
        <div className="buttons">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationDialog;