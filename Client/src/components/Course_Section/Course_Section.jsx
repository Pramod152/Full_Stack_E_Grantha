import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Video_Card from '../Card_Video/Video_Card/Video_Card';

const CourseSection = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

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

  const handleSearch = async (query) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
    try {
      const response = await axios.get(`http://localhost:3000/E-Grantha/user/fuzzySearch?q=${searchQuery}&threshold=4`);
      if (response.status === 200) {
        setSearchResults(response.data.results);
        console.log('Search results:', response.data.results);
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit} className="search-box">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="search-input"
        />
        <button type="submit" className="search-btn">
          <i className="fas fa-search"></i>
        </button>
      </form>
      <div className="video-cards">
        {(searchResults.length > 0 ? searchResults.map((video) => (
          <Video_Card
            key={video.document._id}
            title={video.document.title}
            description={video.document.description}
            videoId={video.document.videoId}
          />
        )) : videos.map((video) => (
                    <Video_Card 
                        key={video._id} // Assuming each video has a unique id
                        title={video.title} 
                        description={video.description} 
                        videoLink={video.videoLink} 
                        videoId={video.videoId}
                        video_id={video._id}
                    />
                ))
        )}
        
      </div>
    </div>
  );
};

export default CourseSection;
