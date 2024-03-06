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
      <table className="subscribed-courses-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Subscribed Course Link</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course._id}>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td><a href={course.videoLink} target="_blank" rel="noopener noreferrer">Watch</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscribedCourses;
