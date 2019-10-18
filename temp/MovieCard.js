import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import StarsIcon from '@material-ui/icons/Stars';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

const allStyle = {
  alignItems: 'top',
  textAlign: 'left',
  padding: '20px 50px',
  width: '80%',
  margin: '0 auto'

};

const imgBox = {
  width: '200px',
  minHeight: '300px',
  display: 'inline-block'
};

const img = {
  display: 'inline-block'
};

const movieInfo = {
  padding: '0px 30px 30px 37px'
};

const ratingsBlock = {
  textAlign: 'right',
  padding: '46px 0px 30px 30px'
};

const overviewBlock = {
  marginLeft: '255px',
  marginTop: '-190px'
};

const link = {
  textDecoration: 'none'
};

const icons = {
};

function MovieCard(props) {
  MovieCard.propTypes = {
    id: PropTypes.number.isRequired,
    lang: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    release: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    voteAvg: PropTypes.number.isRequired
  };

  const {
    id: movieID,
    lang,
    overview,
    release,
    src,
    title,
    voteAvg
  } = props;

  let langFullText = lang;

  switch (lang) {
    case 'en':
      langFullText = 'english';
      break;
    case 'fr':
      langFullText = 'french';
      break;
    case 'sp':
      langFullText = 'spanish';
      break;
    default:
      langFullText = lang;
      break;
  }

  return (
    <Grid container spacing={3} style={allStyle}>
      {/* <Grid item xs={1} /> */}
      <Grid item xs={2}>
        <Link to={{ pathname: `/movies/${movieID}` }}>
          <div style={imgBox}>
            <img
              src={`https://image.tmdb.org/t/p/w200${src}`}
              style={img}
              alt="movie"
            />
          </div>
        </Link>
      </Grid>

      <Grid item xs={5} style={movieInfo}>
        <Link to={{ pathname: `/movies/${movieID}` }} style={link}>
          <h1 style={{ color: '#D99A4E', fontSize: '1.6em' }}>{title}</h1>
        </Link>
        <div style={{ fontSize: '15px', paddingLeft: '2px' }}>
          Release Date: {release}
        </div>
      </Grid>

      <Grid item xs={3} style={ratingsBlock}>
        Avarage rating: <span style={{ fontSize: '32px' }}>{voteAvg}</span>{' '}
      </Grid>

      <Grid item xs={12} style={overviewBlock}>
        {overview}
        <div style={{ marginTop: '20px', fontSize: '15px' }}>
          Language: {langFullText}
        </div>
      </Grid>
      <Grid item xs={8} />
      <Grid item xs={2} style={icons}>
        <StarsIcon fontSize='large' style={{ paddingRight: '50px' }} />
        <WatchLaterIcon fontSize='large' style={{ paddingRight: '50px' }} />
      </Grid>
      <Grid item xs={2} />
    </Grid>
  );
}

export default MovieCard;
