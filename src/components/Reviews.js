import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShowMoreText from 'react-show-more-text';

class Reviews extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired
  };

  constructor() {
    super();
    this.state = {
      reviews: []
    };
  }

  async componentDidMount() {
    const { id: movieID } = this.props;
    const { results: reviews } = await fetch(
      `https://api.themoviedb.org/3/movie/${
      movieID
      }/reviews?api_key=d2530355598301431a821ae172ea0b6f`
    ).then(response => response.json());

    this.setState({
      reviews
    });
  }


  render() {
    const { reviews } = this.state;
    if (reviews.length > 0) {

      return reviews.map(({ author, content, id: reviewID }) => (
        <div key={reviewID} className='reviewBlock'>
          <div style={{ padding: '10px 40px 30px' }}>
            <h4 style={{ color: '#D7994D' }}>{author}</h4>
            <ShowMoreText
              lines={5}
              more="Show more"
              less="Show less"
              anchorClass="colorHref"
              onClick={this.executeOnClick}
              expanded={false}
            >
              {content}
            </ShowMoreText>
          </div>
          {/* <hr style={{ marginTop: '30px', border: '.5px solid wheat' }} /> */}
        </div >
      )
      );
    }
    return <div>There are no reviews for this move yet</div >;

  }
}

export default Reviews;
