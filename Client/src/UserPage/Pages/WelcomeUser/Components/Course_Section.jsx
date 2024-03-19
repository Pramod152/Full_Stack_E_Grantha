import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TopSubscribedVideo_Card';
import './ComponentCSS/Course_Section.css';
import TopSubscribedVideo_Card from './TopSubscribedVideo_Card';

const CourseSection = ({ isHome, searchResults, searchQuery }) => {
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchVideos();
  }, [selectedCategory]); // Fetch videos when selectedCategory changes

  const fetchVideos = async () => {
    try {
      let url;
      if (selectedCategory === 'All') {
        url = "http://localhost:3000/E-Grantha/user/allVideos";
      } else {
        url = `http://localhost:3000/E-Grantha/user/videosWithSimilarCategory/${selectedCategory}`;
      }
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();

          // If selectedCategory is 'All', set videos from data.message
          // Otherwise, set videos from data.similarVideos
          setVideos(selectedCategory === 'All' ? data.message : data.similarVideos);       
      } else {
        console.error("Failed to fetch videos");
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className='course_section_wrapper'>
      {!isHome && (
        <>
          <div className="course_header">
            <h1 id='all_courses'>Courses</h1>
            <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
              <option value="All">All</option>
              <option value="Instrument">Instrument</option>
              <option value="Vocal">Vocal</option>
              <option value="Song">Song</option>
            </select>
          </div>
          <p className='selected_category'>Category: {selectedCategory}</p> {/* Render selected category */}
        </>
      )}
      

<div className="video_cards">
  {(searchQuery.trim() === '' ? 
    // If there's no search query, map over videos based on selected category
    videos
      .filter(video => selectedCategory === 'All' || video.videoCategory === selectedCategory) // Filter based on selected category
      .map((video) => (
        <TopSubscribedVideo_Card 
          key={video._id} // Assuming each video has a unique id
          title={video.title} 
          description={video.description} 
          videoLink={video.videoLink} 
          videoId={video.videoId}
          video_id={video._id}
          thumbnail={video.thumbnailUrl}
        />
      )) 
    : 
    // If there's a search query, filter searchResults based on selected category
    searchResults
      .filter(video => selectedCategory === 'All' || video.document.videoCategory === selectedCategory) // Filter based on selected category
      .map((video) => (
        <TopSubscribedVideo_Card
          key={video.document._id}
          title={video.document.title}
          description={video.document.description}
          videoId={video.document.videoId}
          thumbnail={video.document.thumbnailUrl}
        />
      ))
  )}
</div>
    </div>
  );
};

export default CourseSection;
