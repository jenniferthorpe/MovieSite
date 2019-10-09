import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShowMoreText from 'react-show-more-text';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../style/style.css';

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
    id: PropTypes.number.isRequired
  };

  constructor() {
    super();
    this.state = {
      similarMovies: []
    };
  }

  async componentDidMount() {
    const { id: movieID } = this.props;

    const { results: similarMovies } = await fetch(
      `https://api.themoviedb.org/3/movie/${
      movieID
      }/similar?api_key=d2530355598301431a821ae172ea0b6f`
    ).then(response => response.json());

    this.setState({
      similarMovies
    });
  }

  render() {
    const { similarMovies } = this.state;
    if (similarMovies.length > 0) {

      return similarMovies.map(
        ({ title, poster_path: posterPath, overview, id: movieID }) => (
          <div
            key={movieID}
            style={{
              width: '48%',
              display: 'inline-flex',
              flexWrap: 'wrap',
              margin: '10px'
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
              />
            </div>
            <div
              style={{
                display: 'inline-block',
                width: '50%',
                padding: '10px'
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
    };


    return null;
  }
}

export default SimilarMovies;
