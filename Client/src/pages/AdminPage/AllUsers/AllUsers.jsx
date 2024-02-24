// // Import necessary dependencies
// import React, { useState, useEffect } from "react";

// // Define your AllUsers component
// const AllUsers = () => {
//   // State to store users data
//   const [users, setUsers] = useState([]);

//   // Fetch users data from backend API
//   useEffect(() => {
//     fetchAllUsers();
//   }, []);

//   const fetchAllUsers = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:3000/E-Grantha/admin/allUser",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const data = await response.json();
//       console.log(data);
//       setUsers(data.data); // Assuming your data structure has a 'data' property containing an array of users
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };
//   return (
//     <div>
//       {/* Display users data here */}
//       <h1>All Users</h1>
//       <ul>
//         {users.map((user) => (
//           <li key={user._id}>{user.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// // Export the component
// export default AllUsers;

import React, { useEffect, useState } from "react";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/E-Grantha/admin/allUser",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setUsers(data); // Assuming your data structure is an array of users
        console.log(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div>
      <h1>All Users</h1>

      <h1>this is user page</h1>
    </div>
  );
};

export default AllUsers;
