import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.udashboard.css';

const Navbar_udashboard = ({ onClick, activeTab }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    
    const handleTabClick = (tab) => {
        onClick(tab);
        setDropdownOpen(false); // Close the dropdown menu
    };

    return (
        <>
            <nav>
                <div className="logo-container">
                    <img src="/Logo_.png" alt="Logo" />
                </div>
                <ul className="nav-links">
                    <li><Link to="/" >My Courses</Link></li>
                    <li><Link to="/about" >About</Link></li>
                    <li><Link to="/course">Courses</Link></li>
                    <li><Link to="/contact" >Contact</Link></li>
                </ul>
                <div className="buttons">
                    <Link to='/'><button>LogOut</button></Link>
                    <div className="profile-image">
                            <img src="/profile.jpg" alt="PG" onClick={toggleDropdown} />
                            {dropdownOpen && (
                                <ul className="dropdown-menu">
                                    <li><Link onClick={() => handleTabClick('Profile')} className={activeTab === 'Profile' ? 'active' : ''}>Profile</Link></li>
                                    <li><Link onClick={() => handleTabClick('Settings')} className={activeTab === 'Settings' ? 'active' : ''}>Settings</Link></li>
                                    <li><Link onClick={() => handleTabClick('Log Out')} className={activeTab === 'Log Out' ? 'active' : ''}>Log Out</Link></li>
                                </ul>
                            )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar_udashboard;
