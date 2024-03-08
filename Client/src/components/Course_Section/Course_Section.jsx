import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Video_Card from '../Card_Video/Video_Card/Video_Card';
import './Course_Section.css';

const CourseSection = ({ isHome }) => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchButton, setShowSearchButton] = useState(true);

  useEffect(() => {
    fetchVideos();
    if (isHome) {
      setShowSearchButton(false);
    }
  }, [isHome]);

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
      const response = await axios.get(`http://localhost:3000/E-Grantha/user/fuzzySearch?q=${searchQuery}&threshold=2`);
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
    <div className='course_section_wrapper'>
      {!isHome && (
        <form onSubmit={handleSearchSubmit} className="search_box">
          <input
            type="text"
            value={searchQuery}
            id='fuzzy_search_input'
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="search_input"
          />
          {showSearchButton && (
            <button type="submit" className="search_btn_fuzzy">
              Search
            </button>
          )}
        </form>
      )}
      <div className="video_cards">
        {(searchQuery.trim() === '' ? videos.map((video) => (
            <Video_Card 
                key={video._id} // Assuming each video has a unique id
                title={video.title} 
                description={video.description} 
                videoLink={video.videoLink} 
                videoId={video.videoId}
                video_id={video._id}
            />
        )) : searchResults.map((video) => (
            <Video_Card
              key={video.document._id}
              title={video.document.title}
              description={video.document.description}
              videoId={video.document.videoId}
            />
        )))}
      </div>
    </div>
  );
};

export default CourseSection;
