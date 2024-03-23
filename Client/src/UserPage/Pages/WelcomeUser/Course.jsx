import React ,{useState, useEffect} from 'react';
import NavBar from './Components/NavBar';
import Course_Section from './Components/Course_Section';
import Footer from './Components/Footer'
import axios from 'axios';
import './WelcomeUserCSS/Course.css'
const Course = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchButton, setShowSearchButton] = useState(true);

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
        const trimmedQuery = searchQuery.trim().replace(/\s+/g, ' '); // Trim leading/trailing whitespaces and replace consecutive whitespaces with a single space
        setSearchQuery(trimmedQuery);
        handleSearch(searchQuery);
      };
    
    
    return (
        <>
            <NavBar />
            <div className="search_container">
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
          </div>
            <Course_Section  searchResults={searchResults} searchQuery= {searchQuery}/>
            <Footer />
        </>
    )
}

export default Course;

