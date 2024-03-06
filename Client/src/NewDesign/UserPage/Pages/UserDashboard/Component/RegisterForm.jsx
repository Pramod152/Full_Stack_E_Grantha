// RegisterForm.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'react-auth-kit'
import './ComponentCSS/RegisterForm.css';

const RegisterForm = ({ onSignInClick }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

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
          username: e.target.username.value,
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
          const data = await loginResponse.json();
          // If login is successful, save the token and navigate to the main page
          login({
            token: data.token,
            expiresIn: 60, // Adjust this value according to your setup
            tokenType: 'Bearer',
            authState: data.user, // Adjust this value according to your setup
          });
          navigate('/E-Grantha');
        } else {
          console.error('Login failed after registration');
        }
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="registration-card">
      <h1>Register</h1>
      <div>
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
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