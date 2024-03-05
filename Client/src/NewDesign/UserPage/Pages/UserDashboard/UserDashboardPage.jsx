import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './UsedDashboardCSS/UserDashboardPage.css';
import ProfilePage from './Component/ProfilePage'
import SubscribedCourses from './Component/SubscribedCourses'
import DashboardContent from './Component/DashboardContent'


const MainDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('Dashboard');
  const navigate = useNavigate(); // Initialize navigate

  const handleNavClick = (componentName) => {
    setSelectedComponent(componentName);
    if (componentName === 'LogOut') {
      navigate('/login'); // Redirect to '/login' when LogOut is clicked using navigate
    }
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Dashboard':
        return <DashboardContent />; 
      case 'Profile':
        return <ProfilePage />; 
      case 'Subscribed':
        return <SubscribedCourses />; 
      default:
        return null;
    }
  };

  return (
    <>
        <div className="main_dashboard">
            <div className="sidebar">
                <img src="/Logo_.png" alt="Logo" />
                <hr />
                <ul>
                    <li onClick={() => handleNavClick('Dashboard')}>Dashboard</li>
                    <li onClick={() => handleNavClick('Profile')}>Profile</li>
                    <li onClick={() => handleNavClick('Subscribed')}>Subscribed Courses</li>
                    <li onClick={() => handleNavClick('LogOut')}>LogOut</li>
                </ul>
            </div>
            <div className="mainContainer">
                {renderComponent()}
            </div>
        </div>
    </>
  );
}

export default MainDashboard;
