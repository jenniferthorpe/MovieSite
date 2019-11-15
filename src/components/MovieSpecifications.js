import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import TrailerVideo from './TrailerVideo';
import Reviews from './Reviews';
import SimilarMovies from './SimilarMovies';
import '../style/style.css';
import { TMDBApi } from './TMDBApi';
import { movieSpecificationsAction } from '../actions/actions'

const imgBox = {
  width: '80%',
  maxHeight: '500px',
  overflow: 'hidden',
  borderRadius: '5px',
  boxShadow: '0px 0px 24px -4px rgba(0,0,0,0.36)',
  margin: '0% 10%'
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
  similarMoviesTitleRef = React.createRef();

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    setMovieSpecification: PropTypes.func.isRequired,
    genres: PropTypes.arrayOf(PropTypes.any),
    adult: PropTypes.bool,
    runtime: PropTypes.number,
    backdropPath: PropTypes.string,
    title: PropTypes.string,
    imdbID: PropTypes.string,
    releaseDate: PropTypes.number,
    movieSpecifications: PropTypes.shape({
      genres: PropTypes.arrayOf(PropTypes.any),
      adult: PropTypes.bool,
      runtime: PropTypes.number,
      backdropPath: PropTypes.string,
      title: PropTypes.string,
      imdbID: PropTypes.string,
      releaseDate: PropTypes.number,
    })
  };


  componentDidMount() {
    const {
      movieSpecifications,
      match: {
        params: { id: movieID }
      },
      setMovieSpecification,
    } = this.props;

    if (movieSpecifications !== undefined && movieSpecifications[movieID] !== undefined) {


      if (movieSpecifications[movieID].movieID !== Number(movieID)) {
        const movieIDNum = Number(movieID)
        const getDetailsFromAPI = async (movieIDProp) => {
          const movieDetails = await TMDBApi.getMovieDetails({ movieID: movieIDProp })
          setMovieSpecification(movieDetails);
        }
        getDetailsFromAPI(movieIDNum);
      }

    }
    else {
      const movieIDNum = Number(movieID)
      const getDetailsFromAPI = async (movieIDProp) => {
        const movieDetails = await TMDBApi.getMovieDetails({ movieID: movieIDProp })
        setMovieSpecification(movieDetails);
      }
      getDetailsFromAPI(movieIDNum);
    }
  }

  render() {

    const { movieSpecifications } = this.props;
    if (movieSpecifications !== undefined) {

      const {
        match: {
          params: { id: movieID }
        }
      } = this.props;

      if (movieSpecifications[movieID] !== undefined) {

        const {
          genres,
          adult,
          runtime,
          backdropPath,
          title,
          imdbID,
          releaseDate } = movieSpecifications[movieID];

        const movieIDNum = Number(movieSpecifications[movieID].movieID);

        const genresList = genres.map(({ id, name }) => <div key={id}>{name}</div>);

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
                  style={{ color: '#A65221', marginLeft: '10%' }}
                >
                  Back to list
                 </Link>
              </Typography>
              <h1 style={{ color: '#D99A4E', paddingBottom: '50px', marginLeft: '10%', fontSize: '52px' }}>{title}</h1>
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


            <Grid item xs={12} style={{ padding: '100px 10%' }}>
              <TrailerVideo id={movieIDNum} />
            </Grid>


            <Grid item xs={12}>
              <div style={{ margin: '0px 200px' }}>
                <h1 style={{ padding: '0px 0px 0px 40px', color: '#D99A4E' }}>
                  Reviews
               </h1>
                <Reviews id={movieIDNum} />
              </div>
            </Grid>


            <h1
              style={{
                padding: '50px 0px 50px',
                textAlign: 'center',
                width: '100%',
                color: '#D99A4E'
              }}
              ref={this.similarMoviesTitleRef}
            >
              Similar Movies
               </h1>
            <div style={{ position: 'relative', textAlign: 'center' }}>


              {this.similarMoviesTitleRef ? <SimilarMovies id={movieIDNum} similarMoviesTitle={this.similarMoviesTitleRef} /> : ''}
            </div>

          </Grid>
        )
      }
    }

    return null;
  }
}

const mapState = (state) => ({
  movieSpecifications: state.movieList.movieSpecByID
})

const mapDispatch = (dispatch) => ({
  setMovieSpecification: ({ id, genres, adult, runtime, backdrop_path: backdropPath, title, imdb_id: imdbID, id: movieID, release_date: releaseDate }) => dispatch(movieSpecificationsAction({ id, genres, adult, runtime, backdropPath, title, imdbID, movieID, releaseDate }))
})

export default connect(mapState, mapDispatch)(withRouter(MovieSpecifications));
