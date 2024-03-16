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


  return (
    <div className="course-detail-page">
      {recommendedVideos && recommendedVideos.map((videoData, index) => (
        index === 0 ? (
          // Render video itself in iframe for the first index
          <>
            {/* <iframe
              key={index}
              title={videoData.video.title}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${videoData.video.videoId}`}
              frameBorder="0"
              allowFullScreen
            /> */}
            <Video_Card
              key={videoData.video._id}
              title={videoData.video.title}
              description={videoData.video.description}
              _id={videoData.video._id}
              videoLink={videoData.video.videoLink}
              videoId={videoData.video.videoId}
            />
          </>
        ) : (
          // Render Video_Card component for the remaining videos
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
  );
};

export default CourseDetailPage;
