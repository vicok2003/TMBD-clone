import React from 'react';
import { Link } from 'react-router-dom';
import '../css/showCard.css';

const ShowCard = ({ show }) => {
  return (
    <Link to={`/movie/${show.id}`} className="show-card">
      <img src={`https://image.tmdb.org/t/p/w300${show.poster_path}`} alt={show.title} />
      <div className="show-card-info">
        <h4>{show.title}</h4>
        <p>Rating: {show.vote_average}</p>
      </div>
    </Link>
  );
};

export default ShowCard;
