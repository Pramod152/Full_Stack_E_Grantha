import React, { useState, useEffect } from 'react';
import { getUserData } from '../../../Auth/UserDataManager';
import './ComponentCSS/DashboardContent.css'


const UserDashboard = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const userData = getUserData();
        if (userData) {
            setUserName(userData.firstName);
        }
    }, []);

    return (
        <>
        
            <h1 id='Welcome_User'>Welcome, {userName}</h1>
            {/* Other content of UserDashboard */}
        </>
    );
}

export default UserDashboard;