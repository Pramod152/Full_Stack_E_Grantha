// Import necessary dependencies
import React from "react";
import "./AdminDashboard.css";
// Define your AdminDashboard component
const AdminDashboard = () => {
  return (
   <>
      <div className="admin-page">
          <div className="overlap">
            <div className="overlap_group">
              <img className="collapse-icon" alt="Collapse icon" src="../../../../public/Collapse_Icon.png" />
            </div>
            <div className="nav-items">
              <div className="div-2">
                <img className="img" alt="Dashboard icon" src="./DashBoard_Icon.png" />
                <div className="text-wrapper">Dashboard</div>
              </div>
              <div className="div-2">
                <img className="img" alt="User icon" src="./User_Icon.png" />
                <div className="text-wrapper">Users</div>
              </div>
              <div className="div-2">
                <img className="img" alt="Course icon" src="./Course_Icon.png" />
                <div className="text-wrapper">Courses</div>
              </div>
            </div>
          </div>
          <div className="content-wrapper" />
          <div className="dashboard-text-wrapper">
            <div className="dashboard-text">Dashboard</div>
          </div>
       
      </div>


   </>
  );
};

// Export the component
export default AdminDashboard;
