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
      videoKey: null
    };
  }

  async componentDidMount() {
    const { id: movieID } = this.props;

    const {
      results: [{ key: videoKey }]
    } = await fetch(
      `https://api.themoviedb.org/3/movie/${
      movieID
      }/videos?api_key=d2530355598301431a821ae172ea0b6f`
    ).then(response => response.json());

    this.setState({
      videoKey
    });
  }

  render() {
    const { videoKey } = this.state;
    if (videoKey) {

      return (
        <ReactPlayer
          url={`https://www.youtube.com/embed/${videoKey}`}
          width="800px"
          height="450px"
        />
      );
    }

    return null;
  }
}

export default TrailerVideo;
