import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Grid from '@material-ui/core/Grid';
import StarsIcon from '@material-ui/icons/Stars';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import '../style/firstPage.css'



class MovieCard extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    lang: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    release: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    voteAvg: PropTypes.number.isRequired
  };


  // addFavourite = (event) => {
  //   const movieID = event.currentTarget.dataset.value;

  //   this.setState = {

  //   }
  // }



  render() {

    const {
      id: movieID,
      lang,
      overview,
      release,
      src,
      title,
      voteAvg
    } = this.props;

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
      <div className='container'>

        <Link to={{ pathname: `/movies/${movieID}` }} className='gridImage'>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w200${src}`}
              alt="movie"
            />
          </div>
        </Link>

        <Link to={{ pathname: `/movies/${movieID}` }} style={{ textDecoration: 'none' }} className='title'>
          <h1 style={{ color: '#D99A4E', fontSize: '1.6em' }}>{title}</h1>
        </Link>

        <div className='releaseInfo'>
          Release Date: {release}
        </div>

        <div className='rating'>
          Avarage rating: <span style={{ fontSize: '32px' }}>{voteAvg}</span>{' '}
        </div>

        <div className='overview'>
          {overview}
        </div>

        <div className='language'>
          Language: {langFullText}
        </div>

        <div className='starDiv'>
          <StarsIcon fontSize='large' className='star' data-value={movieID} onClick={this.addFavourite} />
          <span className="tooltiptextFav">Add to favourites</span>
        </div>

        <div className='watchLaterDiv'>
          <WatchLaterIcon fontSize='large' className='watchLater' />
          <span className="tooltiptextwatchLater">Add to watch later</span>
        </div>

      </div>
    );
  }
}

export default MovieCard;
