import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Video_Card from './Video_Card';
import './ComponentCSS/TopCourse_Section.css'

const TopSubscribedCourse_Section = (isHome) => {

  const handleClick = () => {
    window.location.href = "/E-Grantha/course";
  };
    
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/E-Grantha/user/getTopSubscribedVideos');
                const data = response.data.topSubscribedVideos;
                setVideos(data)
            } catch (error) {
                console.error('Error fetching top subscribed videos:', error);
            }
        };
        fetchVideos();

    }, []);
    // console.log(videos)

  return (
    <div id='course_section_wrapper'>
    <div className="course_header_wrapper">
    <h1 id='top_subscribed_courses_heading'>Top Subscribed Courses</h1>
    <span onClick={handleClick}>See All</span>
    </div>
      <div id="video_cards">
        {videos.map((video, index) => (
          <Video_Card
             key={video._id} // Assuming each video has a unique id
                title={video.title} 
                description={video.description} 
                thumbnail = {video.thumbnailUrl}
                _id = {video._id}
          />
        ))}
      </div>
    </div>
  );
};

export default TopSubscribedCourse_Section;
