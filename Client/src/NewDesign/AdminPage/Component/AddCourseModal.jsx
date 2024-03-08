import React, { useState } from 'react';
import './ComponentCSS/AddCourseModal.css'

const AddCourseModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.includes('video')) {
      setFile(selectedFile);
    } else {
      // Reset file input if not a video
      e.target.value = null;
      setFile(null);
      alert('Please upload a valid video file.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your backend submission logic here
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);

    // Example fetch usage
    fetch('http://localhost:3000/E-Grantha/admin/uploadCourse', {
      method: 'POST',
      body: formData,
      credentials: 'include', // Include credentials for cookies
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Handle response as needed
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error
      });

    // Close modal after submission
    onClose();
  };

  return (
    <>
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className='ThisisLabel' htmlFor="title">Title:</label>
            <input type="text" id="titleField" value={title} onChange={handleTitleChange} required />
          </div>
          <div className="form-group">
            <label className='ThisisLabel' htmlFor="description">Description:</label>
            <textarea id="description" value={description} onChange={handleDescriptionChange} required />
          </div>
          <div className="form-group">
            <label className='ThisisLabel' htmlFor="file">Upload Video:</label>
            <input type="file" id="file" accept="video/*" onChange={handleFileChange} required />
          </div>
          <button id='btnn' type="submit">Submit</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddCourseModal;
