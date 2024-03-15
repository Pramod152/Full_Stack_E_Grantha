import React, {useEffect, useState} from 'react';
import './ComponentCSS/UsersTable.css'; 
import { getAdminData } from '../Auth/AdminDataManager';
import { AiFillDelete } from 'react-icons/ai';

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {


    // Fetch users data from the backend
    fetch('http://localhost:3000/E-Grantha/admin/allUser',{},{
      method: 'GET', // or 'POST'
      headers: {
        'Content-Type': 'application/json'
      }
    })
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

  const handleDeleteUsers = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/E-Grantha/admin/deleteUser/${userId}`, {
        method: 'DELETE',

      });
      if (response.ok) {
        const data = await response.json();
        if (data.status === "ok") {
          // Delete user from the state
          setUsers(users.filter(user => user._id !== userId));
          // Show success message
          alert("User deleted successfully");
        } else {
          console.error("Failed to delete user");
        }
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  return (
    <div className="users_table_container">
      <table className="users_table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Subscribed Videos</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{typeof user.fistName === 'string' ? user.firstName.charAt(0).toUpperCase() + user.fistName.slice(1) : user.firstName}</td>
              <td>{typeof user.lastName === 'string' ? user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1) : user.firstName}</td>
              <td>{user.email}</td>
              <td>
                {user.subscribedVideos.length > 0 ? (
                  <span>{user.subscribedVideos.length}</span>
                ) : (
                  <span>No subscribed videos</span>
                )}
              </td>
              <td>
                <AiFillDelete
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => handleDeleteUsers(user._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
