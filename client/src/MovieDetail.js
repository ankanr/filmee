import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

export default function MovieDetail({ match }) {
  const [movie, setMovie] = useState([]);
  const [trailerKey, setTrailerKey] = useState([]);

  useEffect(() => {
    getMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMovie = async (e) => {
    const apiKey = 'cadbfc0143fadc6622e6d38d2b90c356';
    const url = `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${apiKey}&language=en-US`;
    const trailer = `http://api.themoviedb.org/3/movie/${match.params.id}/videos?api_key=${apiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovie(data);
      const res2 = await fetch(trailer);
      const data2 = await res2.json();
      setTrailerKey(
        data2.results
          .filter(
            (res) =>
              res.name.includes('Official Trailer') ||
              res.name.includes('Trailer')
          )
          .map((trailer) => trailer.key)
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="card" key={match.params.id}>
      <img
        className="card--image"
        src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
        alt={movie.title + ' poster'}
      />
      <div className="card--content">
        <h3 className="card--title">{movie.title}</h3>
        <p>
          <small>RELEASE DATE: {movie.release_date}</small>
        </p>
        <p>
          <small>LANGUAGE: {movie.original_language}</small>
        </p>
        <p>
          <small>RATING: {movie.vote_average}</small>
        </p>
        <br />
        <h1>Plot</h1>
        <p className="card--desc">{movie.overview}</p>
        {trailerKey.length !== 0 ? (
          <div className="trailer">
            <h1>Official Trailer</h1>
            {trailerKey.map((trailer) => {
              const videoUrl = `https://www.youtube.com/watch?v=${trailer}`;
              return (
                <div className="trailer-main" key={trailer}>
                  <ReactPlayer url={videoUrl} controls={true} width="100%" />
                </div>
              );
            })}
          </div>
        ) : (
          <h1>No trailer found From tmdb</h1>
        )}
      </div>
    </div>
  );
}
