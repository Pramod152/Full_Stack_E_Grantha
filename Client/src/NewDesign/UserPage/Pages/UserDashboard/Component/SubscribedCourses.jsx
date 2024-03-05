import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../UsedDashboardCSS/SubscribedCourses.css'; // Import CSS file

const SubscribedCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchSubscribedCourses();
  }, []);

  const fetchSubscribedCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/E-Grantha/user/getUserSubscriptions');
      setCourses(response.data.subscribedVideosData);
    } catch (error) {
      console.error('Error fetching subscribed courses:', error);
    }
  };

  return (
    <div className="subscribed-courses-container">
      {courses.map(course => (
        <div key={course._id} className="course-card">
          <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
          <div className="course-info">
            <h3 className="course-title">{course.title}</h3>
            <p className="course-description">{course.description}</p>
            <p className="course-rating">Rating: {course.rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubscribedCourses;
