
import React, { useState } from 'react';
import LoginForm from '../UserDashboard/Component/LoginForm';
import RegisterForm from '../UserDashboard/Component/RegisterForm'; // Assuming you have a RegisterForm component

const UserRegistrationPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Initially, set to login

  const handleSignInClick = () => {
    setIsLogin(true);
  };

  const handleSignUpClick = () => {
    setIsLogin(false);
  };

  return (
    <div>
      {isLogin ? (
        <LoginForm onSignUpClick={handleSignUpClick} />
      ) : (
        <RegisterForm onSignInClick={handleSignInClick} />
      )}
    </div>
  );
};

export default UserRegistrationPage;
