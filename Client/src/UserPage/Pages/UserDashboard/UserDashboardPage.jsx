// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { clearUserData } from '../../Auth/UserDataManager'; // Import clearUserData function
// import './UsedDashboardCSS/UserDashboardPage.css';
// import ProfilePage from './Component/ProfilePage';
// import SubscribedCourses from './Component/SubscribedCourses';
// import DashboardContent from './Component/DashboardContent';
// import {AuthContext} from '../../Auth/AuthContext';
// import {BsArrowLeft} from 'react-icons/bs';

// const UserDashboard = () => {
//   const [selectedComponent, setSelectedComponent] = useState('Dashboard');
//   const { setIsAuthenticated } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleNavClick = (componentName) => {
//     setSelectedComponent(componentName);
//     if (componentName === 'LogOut') {
//       clearUserData();
//       setIsAuthenticated(false);
//        // Clear user data from localStorage
//       navigate('/E-Grantha/register'); // Redirect to the registration page
//     }
//   };

//   const handleClick =()=>{{navigate('/E-Grantha')}}

//   const renderComponent = () => {
//     switch (selectedComponent) {
//       case 'Dashboard':
//         return <DashboardContent />;
//       case 'Profile':
//         return <ProfilePage />;
//       case 'Subscribed':
//         return <SubscribedCourses />;
//       default:
//         return null;
//     }
//   };

//   const handleBackNavigation = () => {
//     navigate('/E-Grantha')
//   }
  

//   return (
//     <>
//       <div className="main_dashboard">
//       <BsArrowLeft size={50} className='back_arrow' onClick={handleBackNavigation}/>
//         <div className="sidebar">
//           <img src="/Logo_.png" alt="Logo" onClick={handleClick}/>
//           <hr />
//           <ul>
//             <li onClick={() => handleNavClick('Dashboard')}>Dashboard</li>
//             <li onClick={() => handleNavClick('Profile')}>Profile</li>
//             <li onClick={() => handleNavClick('Subscribed')}>Subscribed Courses</li>
//             <li onClick={() => handleNavClick('LogOut')}>LogOut</li>
//           </ul>
//         </div>
//         <div className="mainContainer">
//           {renderComponent()}
//         </div>
//       </div>
//     </>
//   );
// }

// export default UserDashboard;

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
        <BsArrowLeft size={50} className='back_arrow' onClick={handleBackNavigation}/>
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
        <div className="mainContainer">
          {ComponentToRender ? <ComponentToRender /> : null}
        </div>
      </div>
    </>
  );
}

export default UserDashboard;