import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Cookies from 'js-cookie'; // Import Cookies library
import './AdminPanel.css';
import UsersTable from '../Component/UsersTable'; // Import the UsersTable component
import CoursesTable from '../Component/CoursesTable';
import DashBoardContent from '../Component/DashBoardContent';
import Messages from '../Component/Messages';

const clearAdminData = () => {
  localStorage.removeItem('AdminData');
  Cookies.remove('AdminData');
};

const AdminPanel = () => {
  const [selectedComponent, setSelectedComponent] = useState('Dashboard');
  const navigate = useNavigate(); // Initialize navigate

  const handleNavClick = (componentName) => {
    setSelectedComponent(componentName);
    if (componentName === 'LogOut') {
      clearAdminData(); // Call clearAdminData function to remove admin data
      navigate('/E-Grantha/adminregister'); // Redirect to '/login' when LogOut is clicked using navigate
    }
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Dashboard':
        return <DashBoardContent />;
      case 'Users':
        return <UsersTable />; // Replace with your Users component
      case 'Courses':
        return <CoursesTable />; // Replace with your Courses component
      case 'Messages':
        return <Messages />; // Replace with your Messages component
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
            <li onClick={() => handleNavClick('Users')}>Users</li>
            <li onClick={() => handleNavClick('Courses')}>Courses</li>
            <li onClick={() => handleNavClick('Messages')}>Messages</li>
            <li onClick={() => handleNavClick('LogOut')}>LogOut</li>
          </ul>
        </div>
        <div className="mainContainer">{renderComponent()}</div>
      </div>
    </>
  );
};

export default AdminPanel;
