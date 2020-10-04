import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import netflix from './logos/netflix.png';
import amazon from './logos/amazon.png';
import imdb from './logos/imdb.png';

export default function MovieDetail({ match }) {
  const [movie, setMovie] = useState([]);
  const [trailerKey, setTrailerKey] = useState([]);
  const [netflixURL, setNetflixURL] = useState('');
  const [amazonURL, setAmazonURL] = useState('');
  const [ratings, setRatings] = useState([]);
  const [imdbID, setImdbID] = useState('');

  useEffect(() => {
    getMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMovie = async (e) => {
    const apiKey = 'cadbfc0143fadc6622e6d38d2b90c356';
    const omdbAPIKey = '417362f5';
    const url = `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${apiKey}&language=en-US`;
    const trailer = `http://api.themoviedb.org/3/movie/${match.params.id}/videos?api_key=${apiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovie(data);
      const movieText = data.title;
      const getImdbURL =
        `http://www.omdbapi.com/?apikey=${omdbAPIKey}&t=` + movieText;
      const res3 = await fetch(getImdbURL);
      const data3 = await res3.json();
      setImdbID(data3.imdbID);
      setRatings(data3.Ratings);
      setNetflixURL(
        'http://www.netflix.com/Search?lnkctr=srchrd-ips&v1=' + movieText
      );
      setAmazonURL(
        `https://www.amazon.in/s?k=${movieText}&i=instant-video&ref=nb_sb_noss_2`
      );
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

      <div className="rating-card">
        <h1>Reviews</h1>
        <div className="ratings">
          {ratings.map((rating) => {
            return (
              <>
                <div className="ratings-inside">
                  {rating.Source} <br />
                  {rating.Value}
                </div>
              </>
            );
          })}
        </div>
      </div>

      <div className="streams">
        <h1>Streaming at</h1>

        <div className="streams-links">
          <a href={netflixURL} target="_blank" rel="noopener noreferrer">
            <img src={netflix} alt="netflix-logo" />
          </a>

          <a href={amazonURL} target="_blank" rel="noopener noreferrer">
            <img src={amazon} alt="amazon-logo" />
          </a>

          <a
            href={`https://www.imdb.com/title/${imdbID}/?ref_=fn_tt_tt_1`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={imdb} alt="imdb-logo" />
          </a>
        </div>
      </div>
    </div>
  );
}
