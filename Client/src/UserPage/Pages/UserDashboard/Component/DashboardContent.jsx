import React from 'react';
import { getUserData } from '../../../Auth/UserDataManager'; // Import the utility functions

const UserDashboard = () => {
    // Retrieve user's data from localStorage
    const userData = getUserData();
    // console.log(userData.firstName);

    // Extract user's name
    const userName = userData ? userData.firstName : '';

    return (
        <div>
            <h1 style={{ fontSize: "40px" }}>Welcome, {userName}</h1>
            {/* Other content of UserDashboard */}
        </div>
    );
}

export default UserDashboard;
