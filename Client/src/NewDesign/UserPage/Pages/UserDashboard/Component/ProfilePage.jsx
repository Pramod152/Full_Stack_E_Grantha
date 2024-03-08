import React, { useState } from 'react';
import { getUserData, saveUserData } from '../../../Auth/UserDataManager'; // Import the utility functions
import './ComponentCSS/ProfilePage.css';

const ProfilePage = () => {
    // Retrieve user's data from localStorage
    const userData = getUserData();
    // State variables to track edited values
    const [firstName, setFirstName] = useState(userData ? userData.firstName : 'Pramod');
    const [lastName, setLastName] = useState(userData ? userData.lastName : 'Ghimire');
    const [email, setEmail] = useState(userData ? userData.email : 'Pramod@gmail.com');
    const [isEditing, setIsEditing] = useState(false);

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Save updated user data to localStorage
        saveUserData({ firstName, lastName });
        setIsEditing(false); // Exit editing mode after submission
    };

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={!isEditing} />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={!isEditing} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                {/* Show update button only when editing */}
                {isEditing && <button type="submit">Update</button>}
            </form>
            {/* Show edit button when not editing */}
            {!isEditing && <button onClick={() => setIsEditing(true)}>Edit</button>}
        </div>
    );
};

export default ProfilePage;
