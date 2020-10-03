import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';

export default function SearchMovies(props) {
  const [query, setQuery] = useState('');

  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
    const apiKey = 'cadbfc0143fadc6622e6d38d2b90c356';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="i.e. Jurassic Park"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <Link to={`movie/${movie.id}`} key={movie.id}>
              <MovieCard movie={movie} />
            </Link>
          ))}
      </div>
    </>
  );
}
