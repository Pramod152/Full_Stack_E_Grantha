import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ComponentCSS/LoginForm.css';

const LoginForm = ({ onSignUpClick }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault(); // Prevent default form submission
    onSignUpClick(); // Call the function passed as prop to switch to registration
  };

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Here you should make the authentication request to your backend
      const response = await fetch('http://localhost:3000/E-Grantha/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });

      if (response.ok) {
        // If authentication is successful, redirect to main page
        navigate('/E-Grantha'); // Adjust the route according to your setup
      } else {
        // Handle authentication failure
        setErrorMessage('Invalid Email or Password');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setErrorMessage('Error during authentication');
    }
  };

  return (
    <div className="login-card">
      <h1>Sign in</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <div>
        <form onSubmit={handleSignIn}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Sign in</button>
        </form>
      </div>
      <p>New to company? <a href="#" onClick={handleSignUp}>Sign up!</a></p>
    </div>
  );
};

export default LoginForm;