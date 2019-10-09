import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import TrailerVideo from './TrailerVideo';
import Reviews from './Reviews';
import SimilarMovies from './SimilarMovies';
import '../style/style.css';

const imgBox = {
  width: '100%',
  maxHeight: '400px',
  overflow: 'hidden',
  borderRadius: '5px',
  boxShadow: '0px 0px 24px -4px rgba(0,0,0,0.36)'
};

const img = {
  width: '100%',
  display: 'block',
  position: 'relative',
  zIndex: '-1'
};

const classes = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1)
  }
}));

class MovieSpecifications extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  constructor() {
    super();
    this.state = {
      movieDetails: null
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id: movieID }
      }
    } = this.props;

    const movieDetails = await fetch(
      `https://api.themoviedb.org/3/movie/${
      movieID
      }?api_key=d2530355598301431a821ae172ea0b6f`
    ).then(response => response.json())

    this.setState({
      movieDetails
    });
  }

  render() {
    const { state } = this;

    if (state.movieDetails) {
      const {
        movieDetails: {
          genres,
          adult,
          runtime,
          backdrop_path: backdropPath,
          title,
          imdb_id: imdbID,
          id: movieID,
          release_date: releaseDate
        }
      } = this.state;

      const genresList = genres.map(({ id, name }) => <div key={id}>{name}</div>
      );

      const runtimeHour = Math.floor(runtime / 60);
      const runtimeMin = runtime % 60;

      return (
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={12}>
            <div style={imgBox}>
              <img
                src={`https://image.tmdb.org/t/p/original${backdropPath}`}
                alt="backdrop"
                style={img}
              />
            </div>
          </Grid>

          <Grid item xs={12}>
            <Typography>
              <Link
                to="/"
                href="/"
                className={classes.link}
                style={{ color: '#A65221' }}
              >
                Back to list
              </Link>
            </Typography>
            <h1 style={{ color: '#D99A4E', paddingBottom: '50px' }}>{title}</h1>
          </Grid>

          <Grid item xs={3} />

          <Grid
            item
            xs={2}
            style={{
              padding: '10px 20px 20px',
              lineHeight: '28px',
              backgroundColor: '#730202',
              color: 'wheat',
              textAlign: 'center',
              height: '250px',
              boxShadow: '0px 0px 24px -4px rgba(0,0,0,0.36)',
              borderRadius: '5px'
            }}
          >
            <h3 style={{ color: '#D99A4E' }}>Genres</h3>
            {genresList}
          </Grid>

          <Grid item xs={1} />

          <Grid
            item
            xs={3}
            style={{
              padding: '10px 20px 20px',
              lineHeight: '28px',
              backgroundColor: '#730202',
              color: 'wheat',
              textAlign: 'center',
              height: '250px',
              boxShadow: '0px 0px 24px -4px rgba(0,0,0,0.36)',
              borderRadius: '5px'
            }}
          >
            <h3 style={{ color: '#D99A4E' }}>More info</h3>

            <div>
              Runtime: {runtimeHour}h {runtimeMin}min
            </div>

            <div>Adult: {adult ? 'Yes' : 'No'}</div>
            <div>Realease date: {releaseDate}</div>

            <Link
              href={`https://www.imdb.com/title/${imdbID}`}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
              style={{ color: 'wheat' }}
            >
              See more on IMDb
            </Link>
          </Grid>

          <Grid item xs={3} />

          <Grid item xs={2} />

          <Grid item xs={8} style={{ margin: '50px 0px' }}>
            <TrailerVideo id={movieID} />
          </Grid>

          <Grid item xs={2} />

          <Grid item xs={12}>
            <h2 style={{ padding: '0px 0px 10px 10px', color: '#D99A4E' }}>
              Reviews
            </h2>
            <Reviews id={movieID} />
          </Grid>

          <Grid item xs={12}>
            <h2
              style={{
                paddingBottom: '10px',
                width: '100%',
                color: '#D99A4E'
              }}
            >
              Similar Movies
            </h2>
            <SimilarMovies id={movieID} />
          </Grid>
        </Grid>
      );
    }

    return null;
  }
}

export default withRouter(MovieSpecifications);
