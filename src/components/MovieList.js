import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MovieCard from './MovieCard';
import { movieListAction } from '../actions/actions';



class MovieList extends React.Component {
  static propTypes = {
    appRef: PropTypes.shape({
      current: PropTypes.any
    }).isRequired
  }


  async componentDidMount() {
    this.fetchMovies();
    window.addEventListener('scroll', this.loadMoreMovies);
  }


  loadMoreMovies = () => {
    const { appRef } = this.props;

    const scrollHeight = appRef.current.scrollHeight - 1306;

    if (window.scrollY === scrollHeight) {
      this.fetchMovies()
    }
  }


  async fetchMovies() {
    const { page, setMovieList } = this.props;

    const { results: movies } = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=d2530355598301431a821ae172ea0b6f&page=${page}`
    ).then(response => response.json());

    setMovieList({ movies, page });
  }


  render() {
    const { movieList } = this.props;

    if (movieList.length > 0) {
      return movieList.map(
        (
          {
            poster_path: posterPath,
            title,
            release_date: releaseDate,
            original_language: originalLanguage,
            adult,
            vote_count: voteCount,
            vote_average: voteAvarage,
            overview,
            id
          }, i
        ) => {
          return (
            <MovieCard
              src={posterPath}
              title={title}
              release={releaseDate}
              lang={originalLanguage}
              adult={adult}
              voteNum={voteCount}
              voteAvg={voteAvarage}
              overview={overview}
              id={id}
              key={id}
              index={i}
            />
          );
        }
      );
    }

    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    movieList: state.movieList.movieList,
    page: state.movieList.page
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMovieList: ({ movies, page }) => dispatch(movieListAction({ movies, page })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
