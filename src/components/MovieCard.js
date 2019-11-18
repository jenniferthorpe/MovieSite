/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
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

    if (favorites.entities.favorites !== undefined) {

      if (favorites.entities.favorites[movieID] === undefined) {
        const newFav = {
          ...favorites.entities.favorites,
          [movieID]: {
            id, lang, overview, release, src, title, voteAvg, voteNum
          }
        }
        const array = Object.values(newFav)
        setFavorites(array)
        TMDBApi.addFavorite({ sessionID, movieIDMedia: movieID, bool: true })
      }
      else if (favorites.entities.favorites[movieID].id === movieID) {
        delete favorites.entities.favorites[movieID]
        const array = Object.values(favorites.entities.favorites)

        setFavorites(array)
        TMDBApi.addFavorite({ sessionID, movieIDMedia: movieID, bool: false })
      }
    }
    else {
      const newFav = {
        [movieID]: {
          id, lang, overview, release, src, title, voteAvg, voteNum
        }
      }
      const array2 = Object.values(newFav)
      setFavorites(array2)
      TMDBApi.addFavorite({ sessionID, movieIDMedia: movieID, bool: true })
    }

  }

  handleWatchLater = async (e) => {
    const { history, setWatchLater, sessionID, watchLater, id, lang, overview, release, src, title, voteAvg, voteNum } = this.props;
    const movieID = Number(e.currentTarget.dataset.value);

    if (sessionID === '') {
      return history.push('/login')
    }

    if (watchLater.entities.watchLater !== undefined) {

      if (watchLater.entities.watchLater[movieID] === undefined) {
        const newFav = {
          ...watchLater.entities.watchLater,
          [movieID]: {
            id, lang, overview, release, src, title, voteAvg, voteNum
          }
        }
        const array = Object.values(newFav)
        setWatchLater(array)
        TMDBApi.addWatchLater({ sessionID, movieIDMedia: movieID, bool: true })
      }
      else if (watchLater.entities.watchLater[movieID].id === movieID) {
        delete watchLater.entities.watchLater[movieID]
        const array = Object.values(watchLater.entities.watchLater)

        setWatchLater(array)
        TMDBApi.addWatchLater({ sessionID, movieIDMedia: movieID, bool: false })
      }
    }
    else {
      const newWatchLater = {
        [movieID]: {
          id, lang, overview, release, src, title, voteAvg, voteNum
        }
      }
      const array2 = Object.values(newWatchLater)
      setWatchLater(array2)
      TMDBApi.addWatchLater({ sessionID, movieIDMedia: movieID, bool: true })
    }

  }


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

    console.log(this.props.watchLater);


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

        {/* GÖR CHECK FÖR TOMT = FAVORTIES.ENTITIES = UNDEFINED */}
        <div className='starDiv'>
          {this.props.favorites.entities.favorites[movieID] !== undefined ?
            <StarIcon fontSize='large' className='star' data-value={movieID} onClick={this.handleFavorites} /> :
            <StarBorderIcon fontSize='large' className='star' data-value={movieID} onClick={this.handleFavorites} />
          }
          <span className="tooltiptextFav">Add to favourites</span>
        </div>

        <div className='watchLaterDiv'>
          {this.props.watchLater.entities.watchLater[movieID] !== undefined ?
            <PlaylistAddCheckIcon fontSize='large' className='watchLater' data-value={movieID} onClick={this.handleWatchLater} /> :
            <PlaylistAddIcon fontSize='large' className='watchLater' data-value={movieID} onClick={this.handleWatchLater} />
          }
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
