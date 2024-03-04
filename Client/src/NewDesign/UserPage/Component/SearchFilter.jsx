// SearchFilter.js

import React, { useState, useEffect } from 'react';

const SearchFilter = ({ onCourseSelect }) => {
  const [courseList, setCourseList] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/E-Grantha/admin/course')
      .then(response => response.json())
      .then(data => setCourseList(data.message.map(course => course.title)))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    if (!searchTerm) {
      setFilteredCourses(courseList);
      return;
    }
    const filteredValues = courseList.filter(
      course => course.title.toLowerCase().includes(searchTerm)
    );
    setFilteredCourses(filteredValues);
  };

  const handleCourseSelect = (selectedCourse) => {
    // onCourseSelect(selectedCourse);
    console.log('clicked');
  };

  return (
    <>
      <input type="text" onChange={handleSearch} placeholder="Search for a course" />
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        {filteredCourses.map((course, index) => (
          <div key={index} onClick={() => handleCourseSelect(course)}>{course}</div>
        ))}
      </div>
    </>
  );
};

export default SearchFilter;
