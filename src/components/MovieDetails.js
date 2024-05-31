import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/movieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: '117ed126c4e71d966f6a3f0dcc090446',
            append_to_response: 'credits'
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchMovieTrailers = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
          params: {
            api_key: '117ed126c4e71d966f6a3f0dcc090446',
          },
        });
        setTrailers(response.data.results);
      } catch (error) {
        console.error('Error fetching movie trailers:', error);
      }
    };

    fetchMovieDetails();
    fetchMovieTrailers();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details-container">
      <div className="movie-header">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-info">
          <h1 className="movie-title">{movie.title} ({movie.release_date.split('-')[0]})</h1>
          <p className="movie-tagline">{movie.tagline}</p>
          <div className="movie-metadata">
            <span>{movie.release_date}</span>
            <span>{movie.genres.map(genre => genre.name).join(', ')}</span>
            <span>{movie.runtime} min</span>
          </div>
          <div className="movie-scores">
            <span className="movie-score">User Score: {movie.vote_average * 10}%</span>
          </div>
          <p className="movie-overview">{movie.overview}</p>
          <div className="movie-credits">
            {movie.credits.crew.filter(member => member.job === 'Director').map(director => (
              <p key={director.id}><strong>Director:</strong> {director.name}</p>
            ))}
            {movie.credits.crew.filter(member => member.job === 'Writer').map(writer => (
              <p key={writer.id}><strong>Writer:</strong> {writer.name}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="movie-cast">
        <h2>Top Billed Cast</h2>
        <div className="cast-list">
          {movie.credits.cast.slice(0, 10).map(actor => (
            <div key={actor.id} className="cast-card">
              <img
                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                alt={actor.name}
                className="cast-photo"
              />
              <p className="cast-name">{actor.name}</p>
              <p className="cast-character">as {actor.character}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="trailers">
        <h2>Trailers</h2>
        <div className="trailer-list">
          {trailers.map(trailer => (
            trailer.site === 'YouTube' && (
              <div key={trailer.id} className="trailer-video">
                <iframe
                  title={trailer.name}
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
