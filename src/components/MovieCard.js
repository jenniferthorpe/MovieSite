/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StarIcon from '@material-ui/icons/Star';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import '../style/firstPage.css';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { TMDBApi } from './TMDBApi';
import { setFavoritesAction, setWatchLaterAction } from '../actions/actions';


class MovieCard extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    setFavorites: PropTypes.func,
    sessionID: PropTypes.string.isRequired,
    favorites: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      lang: PropTypes.string,
      overview: PropTypes.string,
      release: PropTypes.string,
      src: PropTypes.string,
      title: PropTypes.string,
      voteAvg: PropTypes.number,
    }))
  };

  static defaultProps = {
    title: 'Unknown',
    release: 'Unknown',
  }


  handleFavorites = async (e) => {
    const { history, setFavorites, sessionID, favorites, id, lang, overview, release, src, title, voteAvg, voteNum } = this.props;
    const movieID = Number(e.currentTarget.dataset.value);

    if (sessionID === '') {
      return history.push('/login')
    }

    if (favorites[movieID] !== undefined && favorites[movieID].id === movieID) {
      delete favorites[movieID]
      setFavorites({
        ...favorites
      })
      TMDBApi.addFavorite({ sessionID, movieIDMedia: movieID, bool: false })

    }
    else {
      setFavorites({
        [movieID]: {
          id, lang, overview, release, src, title, voteAvg, voteNum
        },
        ...favorites
      })
      TMDBApi.addFavorite({ sessionID, movieIDMedia: movieID, bool: true })
    }
  }

  handleWatchLater = async (e) => {
    const { history, setWatchLater, sessionID, watchLater, id, lang, overview, release, src, title, voteAvg, voteNum } = this.props;
    const movieID = Number(e.currentTarget.dataset.value);

    if (sessionID === '') {
      return history.push('/login')
    }

    if (watchLater[movieID] !== undefined && watchLater[movieID].id === movieID) {
      delete watchLater[movieID]
      setWatchLater({
        ...watchLater
      })
      TMDBApi.addWatchLater({ sessionID, movieIDMedia: movieID, bool: false })

    }
    else {
      setWatchLater({
        [movieID]: {
          id, lang, overview, release, src, title, voteAvg, voteNum
        },
        ...watchLater
      })
      TMDBApi.addWatchLater({ sessionID, movieIDMedia: movieID, bool: true })
    }
  }



  // handleWatchLater = async (e) => {
  //   const { history, setWatchLater, sessionID, watchLater } = this.props;
  //   const movieID = Number(e.currentTarget.dataset.value);

  //   if (sessionID === '') {
  //     return history.push('/login')
  //   }

  //   const newWatchLater = watchLater.filter(({ id }) => {
  //     return id !== movieID
  //   })

  //   if (newWatchLater.length === watchLater.length) {
  //     newWatchLater.push(await TMDBApi.getMovieDetails({ movieID }))
  //   }

  //   watchLater.map(({ id }) => {
  //     TMDBApi.addFavorite({ sessionID, movieIDMedia: id, bool: false })
  //   })
  //   await Promise.all(watchLater)

  //   newWatchLater.map(({ id }) => {
  //     TMDBApi.addFavorite({ sessionID, movieIDMedia: id, bool: true })
  //   })
  //   await Promise.all(newWatchLater)

  //   setWatchLater(newWatchLater);
  // }



  render() {

    const {
      id: movieID,
      lang,
      overview,
      release,
      src,
      title,
      voteAvg,
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
          <StarIcon fontSize='large' className='star' data-value={movieID} onClick={this.handleFavorites} />
          <span className="tooltiptextFav">Add to favourites</span>
        </div>

        <div className='watchLaterDiv'>
          <WatchLaterIcon fontSize='large' className='watchLater' data-value={movieID} onClick={this.handleWatchLater} />
          <span className="tooltiptextwatchLater">Add to watch later</span>
        </div>

      </div >
    )
  }
}

const mapState = (state) => ({
  favorites: state.userInfo.favorites,
  watchLater: state.userInfo.watchLater,
  sessionID: state.userInfo.sessionID,

})

const mapDispatch = (dispatch) => ({
  setFavorites: (detailsObj) => dispatch(setFavoritesAction(detailsObj)),
  setWatchLater: (detailsArr) => dispatch(setWatchLaterAction(detailsArr))
})


export default connect(mapState, mapDispatch)(withRouter(MovieCard));
