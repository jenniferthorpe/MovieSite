import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

class Favourites extends Component {
    static propTypes = {
        sessionID: PropTypes.string.isRequired
    }

    async componentDidMount() {
        const { sessionID } = this.props;
        console.log(sessionID);
        const getFavourites = await (await fetch(`https://api.themoviedb.org/3/account/favorite/movies?api_key=d2530355598301431a821ae172ea0b6f&session_id=${sessionID}`)).json();
        console.log(getFavourites);
    }


    render() {
        return null;

    }
}

const mapStateToProps = (state) => {
    return {
        sessionID: state.userInfo.sessionID
    }
}

export default connect(mapStateToProps)(Favourites);
