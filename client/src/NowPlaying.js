import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

export default function NowPlaying(props) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    nowPlaying();
  }, []);

  const nowPlaying = async (e) => {
    const apiKey = 'cadbfc0143fadc6622e6d38d2b90c356';
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US`;

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
