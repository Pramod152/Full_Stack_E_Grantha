import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";
import Video_Card from "./Components/Video_Card"; // Import the Video_Card component
import TopSubscribedVideo_Card from "./Components/TopSubscribedVideo_Card";

const CourseDetailPage = () => {
  const location = useLocation();
  const responseData = location?.state?.responseData || null;
  const { isAuthenticated } = useContext(AuthContext);
  const recommendedVideos = responseData?.recommendedVideos;
  console.log(recommendedVideos)

  return (
    <div className="course-detail-page">
      {recommendedVideos && recommendedVideos.map((videoData, index) => (
        index === 0 ? (
          // Render video itself in iframe for the first index
          <iframe
            key={index}
            title={videoData.video.title}
            width="560"
            height="315"
            // src={videoData.video.videoLink}
            // src={`https://www.youtube.com/watch?v=oCkGmxS2EiA`}
            src={`https://www.youtube.com/embed/${videoData.video.videoId}`}
            // src={`https://www.youtube.com/embed/oCkGmxS2EiA`}
            frameBorder="0"
            allowFullScreen
          > hello </iframe>
          
        ) : (
          // Render Video_Card component for the remaining videos
          <TopSubscribedVideo_Card
            key={index}
            title={videoData.video.title}
            description={videoData.video.description}
            video_id={videoData.video.videoId}
            thumbnail={videoData.video.thumnailUrl}
            subscribe={true}
          />
        )
      ))}
    </div>
  );
};

export default CourseDetailPage;
