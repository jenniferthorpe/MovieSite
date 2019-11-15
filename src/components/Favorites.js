import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import MovieCard from './MovieCard'
import { movieDetailsAction } from '../actions/actions'

class Favorites extends Component {
    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        movieDetails: PropTypes.shape({
            posterPath: PropTypes.string,
            title: PropTypes.string,
            releaseDate: PropTypes.string,
            originalLanguage: PropTypes.string,
            overview: PropTypes.string,
            adult: PropTypes.bool,
            id: PropTypes.number,
            voteAverage: PropTypes.number,
            voteCount: PropTypes.number,
        }),
        sessionID: PropTypes.string.isRequired
    }


    async componentDidMount() {
        const { history, sessionID } = this.props;

        if (sessionID === '') {
            history.push('/login')
        }

    }


    render() {
        const { favorites } = this.props;

        console.log(favorites);

        for (const obj in favorites) {
            const {
                src: posterPath,
                title,
                release: releaseDate,
                lang: originalLanguage,
                adult,
                voteNum: voteCount,
                voteAvg: voteAverage,
                overview,
                id } = favorites[obj]

            return < MovieCard
                src={posterPath}
                title={title}
                release={releaseDate}
                lang={originalLanguage}
                adult={adult}
                voteNum={voteCount}
                voteAvg={voteAverage}
                overview={overview}
                id={id}
                key={id}
            />

        }


        return <div style={{ textAlign: 'center' }
        }> You don´t have any favourites yet.</div >;
    }

}
const mapState = (state) => ({
    movieDetails: state.userInfo.movieDetailsByID,
    sessionID: state.userInfo.sessionID,
    favorites: state.userInfo.favorites,
})

const mapDispatch = (dispatch) => ({
    setMovieDetails: ({
        posterPath,
        title,
        releaseDate,
        originalLanguage,
        adult,
        voteCount,
        voteAverage,
        overview,
        id }) => dispatch(movieDetailsAction({
            posterPath,
            title,
            releaseDate,
            originalLanguage,
            adult,
            voteCount,
            voteAverage,
            overview,
            id,
            key: id
        }))
})

export default connect(mapState, mapDispatch)(withRouter(Favorites));
