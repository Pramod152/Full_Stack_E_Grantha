import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";
import Video_Card from "./Components/Video_Card"; // Import the Video_Card component
import TopSubscribedVideo_Card from "./Components/TopSubscribedVideo_Card";
import {BsArrowLeft} from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import './WelcomeUserCSS/CourseDetailPage.css'

const CourseDetailPage = () => {
  const location = useLocation();
  const responseData = location?.state?.responseData || null;
  const { isAuthenticated } = useContext(AuthContext);
  const recommendedVideos = responseData?.recommendedVideos;
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate('/E-Grantha/course')
  }

  return (
    <div className="course-detail-page">
     <BsArrowLeft size={50} className='back_arrow_recommendation' onClick={handleBackNavigation}/>
     <div className="main_video">
      {recommendedVideos && recommendedVideos.map((videoData, index) => (
        index === 0 && (
          <>
            <Video_Card
              key={videoData.video._id}
              title={videoData.video.title}
              description={videoData.video.description}
              _id={videoData.video._id}
              videoLink={videoData.video.videoLink}
              videoId={videoData.video.videoId}
            />
          </>
        ) 
      ))}
      </div>
<div id="recommended_courses_wrapper">
<h1 id="recommended_courses_heading">More like this</h1>
<div id="recommended_courses">
      {recommendedVideos && recommendedVideos.map((videoData, index) => (
        index !== 0 && (
          <TopSubscribedVideo_Card
            key={videoData.video._id}
              title={videoData.video.title}
              description={videoData.video.description}
              _id={videoData.video._id}
            thumbnail={videoData.video.thumbnailUrl}
          />
        )
      ))}
      </div>

      </div>

    </div>
  );
};

export default CourseDetailPage;
