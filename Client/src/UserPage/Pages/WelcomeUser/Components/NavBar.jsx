import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ComponentCSS/NavBar.css';
import Button from './Button';
import { AuthContext } from '../../../Auth/AuthContext' // Update the path
import { getUserData } from '../../../Auth/UserDataManager'; // Update the path

const NavBar = () => {
    const { isAuthenticated } = useContext(AuthContext);
    let initials;

    if(isAuthenticated){
        const userData = getUserData();  
        if (userData) {
            initials = userData.firstName.charAt(0).toUpperCase() + userData.lastName.charAt(0).toUpperCase();
        }
    }

    const handleAvatarClick = () => {
        // Redirect to dashboard page on avatar click
        // Replace '/dashboard' with the actual dashboard URL
        window.location.href = '/E-Grantha/dashboard';
    };

    return (
        <>
            <nav>
                <img src="/Logo_.png" alt="Logo" />
                <ul>
                    <li><Link to="/E-Grantha">Home</Link></li>
                    <li><Link to="/E-Grantha/about">About</Link></li>
                    <li><Link to="/E-Grantha/course">Courses</Link></li>
                    <li><Link to="/E-Grantha/contact">Contact</Link></li>
                </ul>
                {/* Conditional rendering based on user authentication */}
                {isAuthenticated ? (
                    <div className="avatar" onClick={handleAvatarClick}>
                        {/* Here you can fetch user initials from backend if needed */}
                        {initials}
                    </div>
                ) : (
                    <Link to='/E-Grantha/register'><Button BtnName="Get Started" /></Link>
                )}
            </nav>
        </>
    );
}

export default NavBar;