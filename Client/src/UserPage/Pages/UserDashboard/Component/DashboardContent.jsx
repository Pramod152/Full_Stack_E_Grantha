import React, { useState, useEffect } from 'react';
import { getUserData } from '../../../Auth/UserDataManager';

const UserDashboard = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const userData = getUserData();
        if (userData) {
            setUserName(userData.firstName);
        }
    }, []);

    return (
        <div>
            <h1 style={{ fontSize: "40px" }}>Welcome, {userName}</h1>
            {/* Other content of UserDashboard */}
        </div>
    );
}

export default UserDashboard;