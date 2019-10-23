import React from 'react';
import PropTypes from 'prop-types'
import MovieCard from './MovieCard';


class MovieList extends React.Component {
  static propTypes = {
    appRef: PropTypes.shape({
      current: PropTypes.any
    }).isRequired
  }

  state = {
    movieList: [],
    page: 1
  };

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
    const { page } = this.state;

    const { results: movieList2 } = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=d2530355598301431a821ae172ea0b6f&page=${page}`
    ).then(response => response.json());

    this.setState((state) => ({
      movieList: state.movieList.concat(movieList2),
      page: state.page + 1
    }))
  }




  render() {
    const { movieList } = this.state;

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

    // window.jen=this
    // console.log("rendered");
    return null;
  }
}

export default MovieList;
