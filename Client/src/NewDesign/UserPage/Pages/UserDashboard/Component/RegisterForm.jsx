import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserData } from '../../../Auth/UserDataManager'; // Import the saveUserData function
import './ComponentCSS/RegisterForm.css';

const RegisterForm = ({ onSignInClick }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault(); // Prevent default form submission
    onSignInClick(); // Call the function passed as prop to switch to login
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('http://localhost:3000/E-Grantha/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: e.target.firstName.value,
          lastName: e.target.lastName.value,
          email: e.target.email.value,
          password: e.target.password.value,
          confirmPassword: e.target['confirm-password'].value,
        }),
      });

      if (response.ok) {
        // Registration successful, now log in the user
        const loginResponse = await fetch('http://localhost:3000/E-Grantha/user/login', {
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
          const { token, user } = await loginResponse.json();
          // If login is successful, save the token and navigate to the main page
          saveUserData({ token, ...user });
          navigate('/E-Grantha/register');
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
    <div className="registration-card">
      <h1>Register</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <div>
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" required />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" required />
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
      <p>Already have an account? <a href="#" onClick={handleSignIn}>Sign in!</a></p>
    </div>
  );
};

export default RegisterForm;
