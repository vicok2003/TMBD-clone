import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; 
import '../css/searchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchMovies = async (searchQuery) => {
    if (searchQuery) {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: '117ed126c4e71d966f6a3f0dcc090446',
            query: searchQuery,
          },
        });

        const results = response.data.results;
        setSuggestions(results);
        setErrorMessage('');
      } catch (error) {
        console.error('Error fetching data from TMDB:', error);
        setSuggestions([]);
        setErrorMessage('The movie you wish to find isn\'t in the TMDB database.');
      }
    } else {
      setSuggestions([]);
      setErrorMessage('');
    }
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    fetchMovies(inputValue);
  };

  const handleSearchIconClick = () => {if (query) { fetchMovies(query);}};

  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a movie..."
          className="search-input"
        />
        <FaSearch
          className={`search-icon ${query ? 'active' : ''}`}
          onClick={handleSearchIconClick}
        />
        {query && (
          <ul className="suggestions-list">
            {errorMessage ? (
              <li className="error-message">{errorMessage}</li>
            ) : suggestions.length > 0 ? (
              suggestions.map((movie) => (
                <li key={movie.id} className="suggestion-item">
                  <Link to={`/movie/${movie.id}`} className="suggestion-link">
                    {movie.title}
                  </Link>
                </li>
              ))
            ) : (
              <li className="no-suggestions">No suggestions found.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
