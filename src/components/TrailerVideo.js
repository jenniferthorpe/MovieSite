import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

class TrailerVideo extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired
  };

  constructor() {
    super();
    this.state = {
      results: []
    };
  }

  async componentDidMount() {
    const { id: movieID } = this.props;

    const {
      results
    } = await fetch(
      `https://api.themoviedb.org/3/movie/${
      movieID
      }/videos?api_key=d2530355598301431a821ae172ea0b6f`
    ).then(response => response.json());

    this.setState({
      results
    });
  }

  render() {
    const { results } = this.state;

    if (results.length > 0) {
      const [{ key: videoKey }] = results;

      return (
        <ReactPlayer
          url={`https://www.youtube.com/embed/${videoKey}`}
          // width="1504px"
          width='100%'
          height="794px"
        />
      );
    }

    return null;
  }
}

export default TrailerVideo;
