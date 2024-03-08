import React, { useState } from 'react';
import Cookies from 'js-cookie';
import './ComponentCSS/AdminRegisterPage.css'

const RegisterForm = ({onSignInClick}) => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState("");


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSignIn = (e) => {
    e.preventDefault(); // Prevent default form submission
    onSignInClick(); // Call the function passed as prop to switch to login
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match'); // Set error state
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/E-Grantha/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName: formData.userName,
          email: formData.email,
          password: formData.password
        })
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Admin registered successfully:', responseData.data);
        saveAdminData(responseData.data);
        alert('Admin registered successfully!');
      } else {
        console.error('Registration failed:', responseData.error);
        setErrorMessage(responseData.error); // Set error state
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage("Error during registration");
    }
  };

  const saveAdminData = (data) => {
    localStorage.setItem("AdminData", JSON.stringify(data));
    Cookies.set('AdminData', JSON.stringify(data), { expires: 7 });
    Cookies.set('AdminToken', data.token, { expires: 7 });
  };

  return (
    <div className='register_card_admin'>
      <h2>Admin Registration Form</h2>
      {/* {errorMessage && <p>{errorMessage}</p>} */}
<div>
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userName">Username:</label><br />
        <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} required /><br />
        </div>
        <div>
        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br />
        </div>
        <div>
        <label htmlFor="password">Password:</label><br />
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required /><br />
        </div>
        <div>
        <label htmlFor="confirmPassword">Confirm Password:</label><br />
        <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required /><br /><br />
        </div>
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if there is any */}
      </form>
      </div>

      <p>Already have an account? <a href="" onClick={handleSignIn}>Sign in!</a></p>
    </div>
  );
};

export default RegisterForm;
