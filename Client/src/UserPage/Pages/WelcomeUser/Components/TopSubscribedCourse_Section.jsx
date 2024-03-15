import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopSubscribedVideo_Card from './TopSubscribedVideo_Card';
import './ComponentCSS/TopCourse_Section.css'

const TopSubscribedCourse_Section = () => {
    
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


  return (
    <div id='course_section_wrapper'>
    <h1 id='top_subscribed_courses_heading'>Top Subscribed Courses</h1>
      <div id="video_cards">
        {videos.map((video, index) => (
          <TopSubscribedVideo_Card
             key={video._id} // Assuming each video has a unique id
                title={video.title} 
                description={video.description} 
                thumbnail = {video.thumbnailUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default TopSubscribedCourse_Section;
