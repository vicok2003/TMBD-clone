import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShowCard from './ShowCard';
import SearchBar from './SearchBar';
import GenreSidebar from './GenreSidebar';
import '../css/showList.css';

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(false);
  const [genreName, setGenreName] = useState('Popular Movies');

  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: '117ed126c4e71d966f6a3f0dcc090446',
            sort_by: 'popularity.desc',
            page: page,
            with_genres: selectedGenre,
          },
        });
        setShows(prevShows => page === 1 ? response.data.results : [...prevShows, ...response.data.results]);
      } catch (error) {
        console.error('Error fetching data from TMDB:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [page, selectedGenre]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleGenreChange = (genre, name) => {
    setShows([]);
    setPage(1);
    setSelectedGenre(genre);
    setGenreName(name);
  };

  return (
    <div className="show-list-container">
      <GenreSidebar setSelectedGenre={handleGenreChange} />
      <div className="show-list">
      <div className="header-container">
          <h2>{genreName}</h2>
          <SearchBar />
      </div>
        <div className="show-container">
          {shows.map(show => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <button className="load-more" onClick={handleLoadMore}>Load More</button>
        )}
      </div>
    </div>
  );
};

export default ShowList;
