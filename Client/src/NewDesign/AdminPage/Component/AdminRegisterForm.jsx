import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAdminData } from '../Auth/AdminDataManager'; // Import the saveAdminData function
// import './ComponentCSS/AdminRegisterForm.css';

const AdminRegisterForm = ({ onSignInClick }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault(); // Prevent default form submission
    onSignInClick(); // Call the function passed as prop to switch to login
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('http://localhost:3000/E-Grantha/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: e.target.userName.value,
          email: e.target.email.value,
          password: e.target.password.value,
          confirmPassword: e.target['confirm-password'].value,
        }),
      });

      if (response.ok) {
        // Registration successful, now log in the admin
        const loginResponse = await fetch('http://localhost:3000/E-Grantha/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: e.target.email.value,
            password: e.target.password.value,
          }),
        });

        if (loginResponse.ok) {
          const { token, admin } = await loginResponse.json();
          // If login is successful, save the token and navigate to the main page
          saveAdminData({ token, ...admin });
          navigate('/E-Grantha/admin');
        } else {
          console.error('Login failed after registration');
        }
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage("Error during registration");
    }
  };

  return (
    <div className="admin-registration-card">
      <h1>Admin Register</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <div>
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="userName">Last Name</label>
            <input type="text" id="userName" name="userName" required />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" required />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      <p>Already have an admin account? <a href="#" onClick={handleSignIn}>Sign in!</a></p>
    </div>
  );
};

export default AdminRegisterForm;
