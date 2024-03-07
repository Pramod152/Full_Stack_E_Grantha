import React, { useState } from 'react';
import LoginForm from '../UserDashboard/Component/LoginForm';
import RegisterForm from '../UserDashboard/Component/RegisterForm';
import NavBar from '../../../../components/NavBar//NavBar_Welcome/NavBar'
import './WelcomeUserCSS/UserRegistrationPage.css'

const UserRegistrationPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSignInClick = () => {
    setIsLogin(true);
  };

  const handleSignUpClick = () => {
    setIsLogin(false);
  };
 
  return (
    <>
      <NavBar />
      <div className="registration_form_wrapper">
      {isLogin ? (
        <LoginForm onSignUpClick={handleSignUpClick}/>
      ) : (
        <RegisterForm onSignInClick={handleSignInClick}  />
      )}
      </div>
    </>
  );
};

export default UserRegistrationPage;
