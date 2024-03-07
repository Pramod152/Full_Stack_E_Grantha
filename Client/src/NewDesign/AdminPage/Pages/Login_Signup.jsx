import React, { useState } from 'react';
import './Login_Signup.css'
import LoginForm from '../Component/AdminLoginForm'
import RegisterForm from '../Component/AdminRegisterForm'

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
