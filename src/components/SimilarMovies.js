import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShowMoreText from 'react-show-more-text';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ReactPaginate from 'react-paginate';
import '../style/style.css'


const classes = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
}));



class SimilarMovies extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    similarMoviesTitle: PropTypes.shape({
      current: PropTypes.any
    }).isRequired
  };

  constructor() {
    super();
    this.state = {
      similarMovies: [],
      page: 1,
      pageArray: []
    };
    this.pagination = this.pagination.bind(this)
    this.posterPathRef = React.createRef();
  }


  componentDidMount() {
    this.getMovieData();
  }


  componentDidUpdate(prevProps, prevState) {
    const { page, similarMovies } = this.state;
    if (page !== prevState.page) {
      this.getMovieData();
    }

    const image404 = similarMovies.map(img => {
      if (img.poster_path === null) {
        // return this.posterPathRef.current.style.display = 'none'
        console.log(img);

      }
    })
  }


  async getMovieData() {
    const { id: movieID } = this.props;
    const { page } = this.state;

    const completeResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${
      movieID
      }/similar?api_key=d2530355598301431a821ae172ea0b6f&page=${page}`
    ).then(response => response.json());

    const pageArray = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= completeResponse.total_pages; i++) {
      pageArray.push(i);
    }

    const { results: similarMovies } = completeResponse;

    this.setState({
      similarMovies,
      pageArray
    });
  }



  pagination(onPage) {
    const { selected } = onPage;

    const { similarMoviesTitle } = this.props;
    similarMoviesTitle.current.scrollIntoView();
    this.setState({ page: selected + 1 })
  }


  render() {
    const { similarMovies, pageArray } = this.state;
    if (similarMovies.length > 0) {

      const similarMapped = similarMovies.map(
        ({ title, poster_path: posterPath, overview, id: movieID }) => (
          <div
            key={movieID}
            style={{
              width: '450px',
              height: '300px',
              display: 'inline-flex',
              flexWrap: 'wrap',
              margin: '25px 10px'
            }}
          >
            <div
              style={{
                width: '200px',
                height: '300px'
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200/${posterPath}`}
                alt="movie poster"
                style={{
                  display: 'inline-block'
                }}
                ref={this.posterPathRef}
              />
            </div>
            <div
              style={{
                display: 'inline-block',
                width: '50%',
                padding: '10px',
                textAlign: 'left'
              }}
            >
              <h3 style={{ color: '#D99A4E' }}>{title}</h3>
              <ShowMoreText
                lines={5}
                more=""
                less="Show less"
                anchorClass=""
                onClick={this.executeOnClick}
                expanded={false}
              >
                {overview}
              </ShowMoreText>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                style={{ marginTop: '10px' }}
                href={`/movies/${movieID}`}
              >
                See more
                </Button>
            </div>
          </div>
        )
      )

      return (
        <div>
          {similarMapped}
          <ReactPaginate pageCount={pageArray.length} pageRangeDisplayed={5} marginPagesDisplayed={1} onPageChange={this.pagination} containerClassName="paginationStyle" activeClassName='activePage' />
        </div>
      )

    };


    return null;
  }
}

export default SimilarMovies;
