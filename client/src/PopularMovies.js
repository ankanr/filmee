import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

export default function PopularMovies(props) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    popularMovies();
  }, []);

  const popularMovies = async (e) => {
    const apiKey = 'cadbfc0143fadc6622e6d38d2b90c356';
    const url = `https://api.themoviedb.org/3/movie/popular?&api_key=${apiKey}&language=en-US`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="card-list">
      {movies
        .filter((movie) => movie.poster_path)
        .map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
    </div>
  );
}
