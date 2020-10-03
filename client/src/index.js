import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import UpcomingMovies from './UpcomingMovies';
import NowPlaying from './NowPlaying';
import PopularMovies from './PopularMovies';
import MovieDetail from './MovieDetail';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './index.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav>
            <ul className="nav-bar">
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/popular">
                <li>Popular Movies</li>
              </Link>
              <Link to="/upcoming">
                <li>Upcoming Movies</li>
              </Link>
              <Link to="/nowplaying">
                <li>Now Playing</li>
              </Link>
            </ul>
          </nav>
          <h1 className="title">Filmee</h1>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/popular" exact component={PopularMovies} />
            <Route path="/upcoming" exact component={UpcomingMovies} />
            <Route path="/nowplaying" exact component={NowPlaying} />
            <Route path="/movie/:id" exact component={MovieDetail} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
