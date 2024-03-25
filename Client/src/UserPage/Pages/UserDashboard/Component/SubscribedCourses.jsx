// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../UsedDashboardCSS/SubscribedCourses.css'; // Import CSS file
// import {getUserData} from '../../../Auth/UserDataManager'
// import Video_Card from '../../WelcomeUser/Components/Video_Card'; // Import the Video_Card component

// const SubscribedCourses = () => {
//   const [courses, setCourses] = useState([]);

  
//   useEffect(() => {
//     fetchSubscribedCourses();
//   }, []);

//   const fetchSubscribedCourses = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/E-Grantha/user/getUserSubscriptions',{
//         withCredentials: true
//       });
//       setCourses(response.data.subscribedVideosData);
//     } catch (error) {
//       console.error('Error fetching subscribed courses:', error);
//     }
//   };

//   console.log(courses);
//   return (
//     <div className="subscribed_courses_container">
//       {
//         courses.length === 0 ? <h1>No courses available</h1> : courses.map(courses => (
//           <Video_Card
//               key={courses._id}
//               title={courses.title}
//               description={courses.description}
//               _id={courses._id}
//               videoLink={courses.videoLink}
//               videoId={courses.videoId}
//             />
//         ))

//       }
      
//     </div>
//   );
// };

// export default SubscribedCourses;


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../UsedDashboardCSS/SubscribedCourses.css';
import {getUserData} from '../../../Auth/UserDataManager'
import Detail_Video_Card from '../../WelcomeUser/Components/Detail_Video_Card';

const SubscribedCourses = () => {
  const [courses, setCourses] = useState([]);

  const fetchSubscribedCourses = useCallback(async () => {
    try {
      const token = getUserData().token;
      const response = await axios.get('http://localhost:3000/E-Grantha/user/getUserSubscriptions',{
        withCredentials: true
      });
      setCourses(response.data.subscribedVideosData);
    } catch (error) {
      console.error('Error fetching subscribed courses:', error);
    }
  }, []);

  useEffect(() => {
    fetchSubscribedCourses();
  }, [fetchSubscribedCourses]);

  return (
    // <div className="subscribed_courses_container">
    <>
      {
        courses.length === 0 ? <h1>No courses available</h1> : courses.map(courses => (
          <Detail_Video_Card
              key={courses._id}
              title={courses.title}
              description={courses.description}
              _id={courses._id}
              videoLink={courses.videoLink}
              videoId={courses.videoId}
            />
        ))
      }
      </>
    // </div>
  );
};

export default React.memo(SubscribedCourses);