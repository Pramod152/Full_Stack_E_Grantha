import React, { useState, useContext } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { AdminAuthContext } from '../Auth/AdminAuthContext';
import './ComponentCSS/AdminLoginForm.css'

const AdminLoginForm = ({onSignUpClick}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState("");


  const { setIsAdminAuthenticated } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault(); // Prevent default form submission
    onSignUpClick(); // Call the function passed as prop to switch to registration
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/E-Grantha/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Login successful:', responseData);
        saveAdminData(responseData);
        setIsAdminAuthenticated(true);
        alert('Login successful!');
        navigate('/E-Grantha/admin');
      } else {
       // Handle authentication failure
       setErrorMessage("Invalid Email or Password");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setErrorMessage("Error during authentication");
      }
  };

  const saveAdminData = (data) => {
    localStorage.setItem("AdminData", JSON.stringify(data));
    Cookies.set('AdminData', JSON.stringify(data), { expires: 7 });
  };

  return (
    <div className='login_card_admin'>
      <h2>Admin Login Form</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <div>
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br />
        </div>
        <div>
        <label htmlFor="password">Password:</label><br />
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required /><br /><br />
        </div>
        <button type="submit">Login</button>
       </form>
       </div>
      <p>
        New to company?{" "}
        <a href="/" onClick={handleSignUp}>
          Sign up!
        </a>
      </p>
    
    </div>
  );
};

export default AdminLoginForm;
