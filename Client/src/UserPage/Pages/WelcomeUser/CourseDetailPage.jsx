import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Detail_Video_Card from "./Components/Detail_Video_Card";
import TopSubscribedVideo_Card from "./Components/Video_Card";
import {BsArrowLeft} from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import './WelcomeUserCSS/CourseDetailPage.css'

const CourseDetailPage = () => {
  const location = useLocation();
  const responseData = location?.state?.responseData || null;
  const recommendedVideos = responseData?.message;
  const navigate = useNavigate();
console.log(recommendedVideos)

  const handleBackNavigation = () => {
    navigate('/E-Grantha/course')
  }

  return (
    <div className="course-detail-page">
     <BsArrowLeft size={50} stroke-width="1" className='back_arrow_recommendation' onClick={handleBackNavigation}/>
     <div className="main_video">
      {recommendedVideos && recommendedVideos.map((videoData, index) => (
        index === 0 && (
          <>
            <Detail_Video_Card
              key={videoData._id}
              title={videoData.title}
              description={videoData.desc}
              _id={videoData._id}
              videoLink={videoData.videoLink}
              videoId={videoData.videoId}
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
            key={videoData._id}
              title={videoData.title}
              description={videoData.desc}
              _id={videoData._id}
            thumbnail={videoData.thumbnailUrl}
          />
        )
      ))}
      </div>

      </div>

    </div>
  );
};

export default CourseDetailPage;
