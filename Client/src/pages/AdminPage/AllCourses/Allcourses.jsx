// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function AllCourses() {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/E-Grantha/admin/course"
//         ); // replace with your actual API endpoint
//         setVideos(response.data.data);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {videos.map((video, index) => (
//         <div key={index}>
//           <h2>{video.videoDetails.title}</h2>
//           <p>{video.videoDetails.description}</p>
//           {/* Display video content here */}
//         </div>
//       ))}
//     </div>
//   );
// }

// // export default AllCourses;
// // --------------------------------------------------------------------
// // --------------------------------------------------------------------
// // --------------------------------------------------------------------
// // --------------------------------------------------------------------
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function AllCourses() {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/E-Grantha/admin/course"
//         );
//         setVideos(response.data.data);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {videos.map((video, index) => (
//         <div key={index}>
//           <h2>{video.videoDetails.title}</h2>
//           <p>{video.videoDetails.description}</p>
//           {/* Display video content here */}
//           <video controls>
//             <source
//               src={`http://localhost:3000${video.videoContent}`}
//               type="video/mp4"
//             />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default AllCourses;
// -------------------------------------------------------------------
// -------------------------------------------------------------------
// -------------------------------------------------------------------
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

function AllCourses() {
  // const [videos, setVideos] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:3000/E-Grantha/admin/course"
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setVideos(data.data);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
    <div>
      {/* {videos.map((video, index) => (
        <div key={index}>
          <h2>{video.videoDetails.title}</h2>
          <p>{video.videoDetails.description}</p> */}

          {/* <iframe
            src="https://drive.google.com/file/d/1by9iUGeKDARr_0tBtfhR7ve--hNlLi74/view?usp=drivesdk"
            width="640"
            height="480"
            allow="autoplay"
          ></iframe> */}
          
          <video width="320" height="240" controls>
            <source src="http://localhost:3000/E-Grantha/admin/course/video.mp4" type="video/mp4">
            </source>
            Your browser does not support the video tag.
          </video>
          


        {/* </div> */}
      {/* ))} */}
      </div>
    </>
  );
}

export default AllCourses;
