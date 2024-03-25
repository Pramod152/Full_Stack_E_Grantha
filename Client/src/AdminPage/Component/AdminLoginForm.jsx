import React, { useState, useContext } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './ComponentCSS/AdminLoginForm.css';
import {AdminAuthContext} from '../Auth/AdminAuthContext'

const AdminLoginForm = ({ onSignUpClick }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsAdminAuthenticated } = useContext(AdminAuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/E-Grantha/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const { token } = await response.json();
        Cookies.set('jwt', token, { expires: 100 }); // Expires in 1 day

        setIsAdminAuthenticated(true);

        alert('Login successful!');
        navigate('/E-Grantha/admin');
      } else {
        const { error } = await response.json();
        setErrorMessage(error);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setErrorMessage("Error during authentication");
    }
  };

  return (
    <div className='login_card_admin'>
      <h1 style={{textAlign: "center"}}>Admin Login Form</h1>
      {errorMessage && <p>{errsorMessage}</p>}
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
      
    </div>
  );
};

export default AdminLoginForm;
