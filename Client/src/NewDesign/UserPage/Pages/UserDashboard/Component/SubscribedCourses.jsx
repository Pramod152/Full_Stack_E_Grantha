import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../UsedDashboardCSS/SubscribedCourses.css'; // Import CSS file
import {getUserData} from '../../../Auth/UserDataManager'

const SubscribedCourses = () => {
  const [courses, setCourses] = useState([]);

  
  useEffect(() => {
    fetchSubscribedCourses();
  }, []);

  const fetchSubscribedCourses = async () => {
    try {
      const token = getUserData().token; // Assuming you have a function to get the user token
      const response = await axios.get('http://localhost:3000/E-Grantha/user/getUserSubscriptions',{
        withCredentials: true
      });
      setCourses(response.data.subscribedVideosData);
    } catch (error) {
      console.error('Error fetching subscribed courses:', error);
    }
  };
  return (
    <div className="subscribed_courses_container">
      <table className="subscribed_courses_table">
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
              <td>{course.videoLink}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscribedCourses;
