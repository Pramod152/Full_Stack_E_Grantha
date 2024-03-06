import React, {useEffect, useState} from 'react';
import './ComponentCSS/UsersTable.css'; // Import CSS file for styling

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Define the URL from which to fetch the users data (replace demoUrl with actual backend URL)
    const demoUrl = 'http://localhost:3000/E-Grantha/admin/allUser';
    
    // Fetch users data from the backend
    fetch(demoUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users data');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data.data); // Set the fetched users data to state
      })
      .catch(error => {
        console.error('Error fetching users data:', error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on component mount
  return (
    <div className="users_table_container">
      <table className="users_table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Subscribed Videos</th>
            <th>Is Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
            <td>{typeof user.name === 'string' ? user.firstName.charAt(0).toUpperCase() + user.name.slice(1) : user.firstName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                {user.subscribedVideos.length > 0 ? (
                  <ul>
                    {user.subscribedVideos.map((video, index) => (
                      <li key={index}>{video}</li>
                    ))}
                  </ul>
                ) : (
                  <span>No subscribed videos</span>
                )}
              </td>
              <td>{user.isAdmin ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
