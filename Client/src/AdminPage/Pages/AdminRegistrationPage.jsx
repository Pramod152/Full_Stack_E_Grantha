import React, { useState } from 'react';
import AdminLoginForm from '../Component/AdminLoginForm';
import AdminRegisterForm from '../Component/AdminRegisterForm';
import './AdminRegistrationPage.css'

const AdminRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const onSignInClick = () => {
    setIsLogin(true);
  };

  const onSignUpClick = () => {
    setIsLogin(false);
  };
 
  return (
    <>
      <div className="registration_form_wrapper">
      {isLogin ? (
        <AdminLoginForm onSignUpClick={onSignUpClick}/>
      ) : (
        <AdminRegisterForm onSignInClick={onSignInClick}  />
      )}
      </div>
    </>
  );
};

export default AdminRegisterPage;
