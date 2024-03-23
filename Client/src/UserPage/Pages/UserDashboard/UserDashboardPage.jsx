import React, { useState, useContext, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearUserData } from '../../Auth/UserDataManager';
import './UsedDashboardCSS/UserDashboardPage.css';
import ProfilePage from './Component/ProfilePage';
import SubscribedCourses from './Component/SubscribedCourses';
import DashboardContent from './Component/DashboardContent';
import {AuthContext} from '../../Auth/AuthContext';
import {BsArrowLeft} from 'react-icons/bs';

const componentMap = {
  'Dashboard': DashboardContent,
  'Profile': ProfilePage,
  'Subscribed': SubscribedCourses
};

const UserDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('Dashboard');
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavClick = (componentName) => {
    setSelectedComponent(componentName);
    if (componentName === 'LogOut') {
      clearUserData();
      setIsAuthenticated(false);
      navigate('/E-Grantha/register');
    }
  };

  const handleClick = () => navigate('/E-Grantha');

  const handleBackNavigation = () => navigate('/E-Grantha');

  const ComponentToRender = componentMap[selectedComponent];

  return (
    <>
      <div className="main_dashboard">
      <BsArrowLeft size={50} stroke-width="1" id='back_arrow_recommendation' onClick={handleBackNavigation}/>
        <div className="sidebar">
          <img src="/Logo_.png" alt="Logo" onClick={handleClick}/>
          <hr />
          <ul>
            <li onClick={() => handleNavClick('Dashboard')}>Dashboard</li>
            <li onClick={() => handleNavClick('Profile')}>Profile</li>
            <li onClick={() => handleNavClick('Subscribed')}>Subscribed Courses</li>
            <li onClick={() => handleNavClick('LogOut')}>LogOut</li>
          </ul>
        </div>
        <div id="mainContainer">
          {ComponentToRender ? <ComponentToRender /> : null}
        </div>
      </div>
    </>
  );
}

export default UserDashboard;