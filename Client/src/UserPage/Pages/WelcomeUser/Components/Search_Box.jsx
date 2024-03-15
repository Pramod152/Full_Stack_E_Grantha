// import React, { useState } from 'react';
// import axios from 'axios';
// // import './ComponentCSS/Search_Box.css';

// const SearchBox = ({ onSearch }) => {
//   const [query, setQuery] = useState('');
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.get(`http://localhost:3000/E-Grantha/user/fuzzySearch?q=Admin&threshold=2`);
//       if (response.status === 200) {
//         onSearch(response.data.results);
//         console.log('This is '+ response.data.results); // Pass search results to parent component
//       } else {
//         console.error('Failed to fetch search results');
//       }
//     } catch (error) {
//       console.error('Error searching:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="search-box">
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Search..."
//         className="search-input"
//       />
//       <button type="submit" className="search-btn">
//         <i className="fas fa-search"></i>
//       </button>
//     </form>
//   );
// };

// export default SearchBox;
