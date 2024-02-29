// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage/HomePage";
// import AboutPage from "./pages/AboutPage/About";
// import CoursesPage from "./pages/CoursePage/Course";
// import ContactPage from "./pages/ContactPage/Contact";
// import LoginPage from "./components/Login_SignUp/Login_SignUp";
// import U_Dashboard from "./pages/UserDashboardPage/U_Dashboard";
// import Registration from "./pages/RegistrationPage/Registration";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/course" element={<CoursesPage />} />
//         <Route path="/contact" element={<ContactPage />} />
//         <Route path="/login" element={<Registration />} />
//         <Route path="/udashboard" element={<U_Dashboard />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

//////////////////////////////--------------------/////////////////////////////
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AdminDashboard from "./pages/AdminPage/AdminDashboard";
// import AllUsers from "./pages/AdminPage/AllUsers";
// import CourseManagement from "./pages/AdminPage/CourseManagement";
// import UploadCourse from "./pages/AdminPage/UploadCourse";
// import DeleteCourse from "./pages/AdminPage/DeleteCourse";
// import UpdateCourse from "./pages/AdminPage/UpdateCourse";
// import DeleteUser from "./pages/AdminPage/DeleteUser";
// import AllUsers from "./pages/AdminPage/AllUsers/AllUsers";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
{
  /* <Route exact path="/E-Grantha/admin" component={AdminDashboard} /> */
}
{
  /* <Route path="/E-Grantha/admin/allUser/" component={AllUsers} /> */
}
{
  /* <Route path="/E-Grantha/admin/course" component={CourseManagement} />
        <Route path="/E-Grantha/admin/uploadCourse" component={UploadCourse} />
        <Route
          path="/E-Grantha/admin/deleteCourse/:courseId"
          component={DeleteCourse}
        />
        <Route
          path="/E-Grantha/admin/updateCourse/:courseId"
          component={UpdateCourse}
        />
        <Route
          path="/E-Grantha/admin/deleteUser/:userId"
          component={DeleteUser}
        /> */
}
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllUsers from "./pages/AdminPage/AllUsers/AllUsers";
import AdminDashboard from "./pages/AdminPage/AdminDashboard/AdminDashboard";
import Allcourses from "./pages/AdminPage/AllCourses/Allcourses";
import AccountProfileDetails from './pages/AdminPage/AdminDashboard/Account';
import CustomersTable from "./pages/AdminPage/AdminDashboard/Customer_Table";
import AdminPanel from "./pages/Admin/AdminPanel";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     {/* Other routes */}
    //     {/* <Route path="/E-Grantha/admin/allUser" element={<AllUsers />} />
    //     <Route path="/dashboard" element={<AdminDashboard />} />
    //     <Route
    //       path="/E-Grantha/dashboard/Allcourses"
    //       element={<Allcourses />}
    //     /> */}
    //     {/* <Route
    //       path="/E-Grantha/dashboard/Allcourses"
    //       element={<AdminDashboard />}
    //     /> */}
    //     <Route
    //       path="/E-Grantha/admin"
    //       element={<AccountProfileDetails />}>
    //       </Route>
    //       <Route path="/E-Grantha/customer" element={<CustomersTable />} > </Route>
    //   </Routes>
    // </Router>
     
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPanel />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
