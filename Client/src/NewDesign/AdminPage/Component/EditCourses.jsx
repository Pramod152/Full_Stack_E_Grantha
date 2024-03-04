// EditCourseModal.jsx
import React, { useState } from 'react';
import './ComponentCSS/EditCourse.css'; // Import CSS file for modal styling

const EditCourseModal = ({ course, onClose, onUpdate }) => {
  const [editedCourse, setEditedCourse] = useState({
    title: course.title,
    description: course.description
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the course with the edited data
      const response = await fetch(`http://localhost:3000/E-Grantha/admin/updateCourse/${course.videoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedCourse)
      });
      if (!response.ok) {
        throw new Error('Failed to update course');
      }
      // Call the onUpdate function to update the course data in parent component
      onUpdate(editedCourse);
      onClose();
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <div className="modal_overlay">
      <div className="modal_content">
        <h2>Edit Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="form_group">
            <label>Title:</label>
            <input type="text" name="title" value={editedCourse.title} onChange={handleChange} />
          </div>
          <div className="form_group">
            <label>Description:</label>
            <textarea name="description" value={editedCourse.description} onChange={handleChange} />
          </div>
          <div className="form_actions">
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCourseModal;
