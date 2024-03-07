import React, { useState, useEffect } from 'react';
import Video_Card from '../Card_Video/Video_Card/Video_Card';
import './Course_Section.css';
import { Link } from 'react-router-dom';

const Course_Section = ({ showSeeAll, renderCount }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch("http://localhost:3000/E-Grantha/user/allVideos");
                if (response.ok) {
                    const data = await response.json();
                    if (data.status === "ok") {
                        setVideos(data.message); // Set fetched videos data to state
                    } else {
                        console.error("API returned error status:", data.status);
                    }
                } else {
                    console.error("Failed to fetch videos");
                }
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };

        fetchVideos();
    }, []); // Fetch videos data only once on component mount

    let renderedVideos = videos;
    if (renderCount === 4 && showSeeAll === "Home") {
        renderedVideos = videos.slice(0, 4); // Render only 4 videos if showSeeAll is "Home"
    }

    return (
        <div className="courses">
            <div className="course_header">
                <h1>Courses</h1>
                {showSeeAll && <Link to="/E-Grantha/course">See All</Link>}
            </div>
            <div className="card-wrapper">
                {/* Map through the videos array and render Video_Card for each video */}
                {renderedVideos.map(video => (
                    <Video_Card 
                        key={video._id} // Assuming each video has a unique id
                        title={video.title} 
                        description={video.description} 
                        videoLink={video.videoLink} 
                        videoId={video.videoId}
                        video_id={video._id}
                    />
                ))}
            </div>
        </div>
    );
};

export default Course_Section;
