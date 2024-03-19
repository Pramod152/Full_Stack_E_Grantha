// import React, { useState } from 'react';
// import './ComponentCSS/AddCourseModal.css'

// const AddCourseModal = ({ isOpen, onClose }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [videoFile, setVideoFile] = useState(null);
//   const [thumbnailFile, setThumbnailFile] = useState(null);

//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const handleVideoFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && selectedFile.type.includes('video')) {
//       setVideoFile(selectedFile);
//     } else {
//       // Reset file input if not a video
//       e.target.value = null;
//       setVideoFile(null);
//       alert('Please upload a valid video file.');
//     }
//   };

//   const handleThumbnailFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && selectedFile.type.includes('image')) {
//       setThumbnailFile(selectedFile);
//     } else {
//       // Reset file input if not an image
//       e.target.value = null;
//       setThumbnailFile(null);
//       alert('Please upload a valid image file for thumbnail.');
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Implement your backend submission logic here
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('videoPath', videoFile);
//     formData.append('thumbnailPath', thumbnailFile);

//     // Example fetch usage
//     fetch('http://localhost:3000/E-Grantha/admin/uploadCourse', {
//       method: 'POST',
//       body: formData,
//       credentials: 'include', // Include credentials for cookies
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//         // Handle response as needed
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         // Handle error
//       });

//     // Close modal after submission
//     onClose();
//   };

//   return (
//     <>
//     <div className={`modal ${isOpen ? 'open' : ''}`}>
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>&times;</span>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label className='ThisisLabel' htmlFor="title">Title:</label>
//             <input type="text" className= "titelModal" id="titleField" value={title} onChange={handleTitleChange} required />
//           </div>
//           <div className="form-group">
//             <label className='ThisisLabel' htmlFor="description">Description:</label>
//             <textarea id="description" className= "titelModal" value={description} onChange={handleDescriptionChange} required />
//           </div>
//           <div className="form-group">
//             <label className='ThisisLabel' htmlFor="videoFile">Upload Video:</label>
//             <input type="file" id="videoFile" accept="video/*" name='videoPath' onChange={handleVideoFileChange} required />
//           </div>
//           <div className="form-group">
//             <label className='ThisisLabel' htmlFor="thumbnailFile">Upload Thumbnail:</label>
//             <input type="file" id="thumbnailFile" accept="image/*"name='thumbnailPath' onChange={handleThumbnailFileChange} required />
//           </div>
//           <button id='btnn' type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//     </>
//   );
// };

// export default AddCourseModal;

import React, { useState } from 'react';
import './ComponentCSS/AddCourseModal.css'

const AddCourseModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoCategory, setVideoCategory] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleVideoFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.includes('video')) {
      setVideoFile(selectedFile);
    } else {
      // Reset file input if not a video
      e.target.value = null;
      setVideoFile(null);
      alert('Please upload a valid video file.');
    }
  };

  const handleThumbnailFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.includes('image')) {
      setThumbnailFile(selectedFile);
    } else {
      // Reset file input if not an image
      e.target.value = null;
      setThumbnailFile(null);
      alert('Please upload a valid image file for thumbnail.');
    }
  };

  const handleVideoCategoryChange = (e) => {
    setVideoCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your backend submission logic here
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('videoPath', videoFile);
    formData.append('thumbnailPath', thumbnailFile);
    formData.append('videoCategory', videoCategory); // Add video category to the form data

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
              <input type="text" className="titelModal" id="titleField" value={title} onChange={handleTitleChange} required />
            </div>
            <div className="form-group">
              <label className='ThisisLabel' htmlFor="description">Description:</label>
              <textarea id="description" className="titelModal" value={description} onChange={handleDescriptionChange} required />
            </div>
            <div className="form-group">
              <label className='ThisisLabel' htmlFor="videoFile">Upload Video:</label>
              <input type="file" id="videoFile" accept="video/*" name='videoPath' onChange={handleVideoFileChange} required />
            </div>
            <div className="form-group">
              <label className='ThisisLabel' htmlFor="thumbnailFile">Upload Thumbnail:</label>
              <input type="file" id="thumbnailFile" accept="image/*" name='thumbnailPath' onChange={handleThumbnailFileChange} required />
            </div>
            {/* New input field for video category */}
            <div className="form-group">
              <label className='ThisisLabel' htmlFor="videoCategory">Category:</label>
              <input type="text" id="videoCategory" className="titelModal" value={videoCategory} onChange={handleVideoCategoryChange} required />
            </div>
            <button id='btnn' type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCourseModal;
