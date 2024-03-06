import React, { useState } from 'react';
import LoginForm from '../UserDashboard/Component/LoginForm';
import RegisterForm from '../UserDashboard/Component/RegisterForm';

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
      {isLogin ? (
        <LoginForm onSignUpClick={handleSignUpClick}/>
      ) : (
        <RegisterForm onSignInClick={handleSignInClick}  />
      )}
    </>
  );
};

export default UserRegistrationPage;
