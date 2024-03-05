import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './UsedDashboardCSS/UserDashboardPage.css';
// import DashBoardContent from '../Component/DashBoardContent';


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
        return <h1>Hello, User</h1>;
      case 'Users':
        return <h1>hello users</h1>; // Replace with your Users component
      case 'Courses':
        return <h1>hello courses</h1>; // Replace with your Courses component
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
                    <li onClick={() => handleNavClick('Users')}>Profile</li>
                    <li onClick={() => handleNavClick('Courses')}>Subscribed Courses</li>
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
