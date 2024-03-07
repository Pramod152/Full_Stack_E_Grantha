import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AdminAuthContext } from "../Auth/AdminAuthContext";
import { saveAdminData } from '../Auth/AdminDataManager'; // Import the saveAdminData function
// import "./ComponentCSS/AdminLoginForm.css";

const AdminLoginForm = ({ onSignUpClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsAdminAuthenticated } = useContext(AdminAuthContext);

  const handleSignUp = (e) => {
    e.preventDefault(); // Prevent default form submission
    onSignUpClick(); // Call the function passed as prop to switch to registration
  };

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Clear localStorage for a fresh start
      localStorage.clear();

      // Here you should make the authentication request to your backend
      const response = await fetch("http://localhost:3000/E-Grantha/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });

      if (response.ok) {
        // If authentication is successful, redirect to the previous page or main page
        const { token, admin } = await response.json();
        setIsAdminAuthenticated(true); // Update the state of the context

        // Save admin data and token in local storage
        saveAdminData({ token, ...admin });

        // Redirect to the previous page or main page
        const { from } = location.state || { from: { pathname: "/E-Grantha/admin" } };
        navigate(from);
      } else {
        // Handle authentication failure
        setErrorMessage("Invalid Email or Password");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setErrorMessage("Error during authentication");
    }
  };

  return (
    <div className="admin-login-card">
      <h1>Admin Sign in</h1>
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
      <p>
        New to company?{" "}
        <a href="#" onClick={handleSignUp}>
          Sign up!
        </a>
      </p>
    </div>
  );
};

export default AdminLoginForm;
