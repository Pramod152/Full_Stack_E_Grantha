import React, { useState, useEffect } from 'react';
import './ComponentCSS/CoursesTable.css'; // Import CSS file for styling
import EditCourseModal from './EditCourses'; // Import the EditCourseModal component
import axios from 'axios'; // Import axios for making HTTP requests

const CoursesTable = () => {
    const [selectAll, setSelectAll] = useState(false);
    const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Define the URL from which to fetch the courses data (replace demoUrl with actual backend URL)
    const demoUrl = 'http://localhost:3000/E-Grantha/admin/course';
    
    // Fetch courses data from the backend
    fetch(demoUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch courses data');
        }
        return response.json();
      })
      .then(data => {
        setCourses(data.message); // Set the fetched courses data to state
      })
      .catch(error => {
        console.error('Error fetching courses data:', error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  // Function to handle row selection
  const handleRowSelect = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // If checkbox is checked, select all rows
      setSelectAll(true);
    } else {
      // If checkbox is unchecked, deselect all rows
      setSelectAll(false);
    }
  };

  //Update
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const openModal = (course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateCourse = (updatedCourse) => {
    // Implement logic to update the course data
    console.log('Updated course:', updatedCourse);
  };


  // Function to handle deleting a course
  const handleDeleteCourse = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/E-Grantha/admin/deleteCourse/${id}`);
      if (response && response.data && response.data.success) {
        // Assuming the deletion was successful, you may want to update your local state or fetch courses again from backend
        console.log('Course deleted successfully');
        // Fetch courses data from the backend
        const demoUrl = 'http://localhost:3000/E-Grantha/admin/course';
        const responseData = await axios.get(demoUrl);
        setCourses(responseData.data.message); // Update the courses list after deletion
      } else {
        console.error('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  // Function to handle adding a new course
  const handleAddCourse = () => {
    // Implement add functionality as needed
    console.log('Adding a new course');
  };

  return (
    <div className="courses_table_container">
      <button className="add_button" onClick={handleAddCourse}>Add</button>
      <table className="courses_table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleRowSelect}
              />
            </th>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>VideoId</th>
            <th>VideoLink</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course._id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{course.id}</td>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>{course.videoId}</td>
              <td>{course.videoLink}</td>
              <td>
              <button onClick={() => openModal(course)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDeleteCourse(course.videoId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <EditCourseModal
          course={editingCourse}
          onClose={closeModal}
          onUpdate={updateCourse}
        />
      )}
    </div>
  );
}

export default CoursesTable;
