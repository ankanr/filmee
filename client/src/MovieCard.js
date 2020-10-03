import React from 'react';

export default function MovieCard({ movie }) {
  return (
    <div className="card">
      <img
        className="card--image"
        src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
        alt={movie.title + ' poster'}
      />
      <div className="card--content">
        <h3 className="card--title">{movie.title}</h3>
      </div>
    </div>
  );
}
