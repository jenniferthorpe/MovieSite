import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Favourites extends Component {
    static propTypes = {
        sessionID: PropTypes.string.isRequired
    }

    async componentDidMount() {
        const { sessionID } = this.props;
        const getFavourites = await (await fetch(`https://api.themoviedb.org/3/account/favorite/movies?api_key=d2530355598301431a821ae172ea0b6f&session_id=${sessionID}`)).json();
        console.log(getFavourites);
    }


    render() {
        return null;

    }
}

export default Favourites;
