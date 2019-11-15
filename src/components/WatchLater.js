import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import MovieCard from './MovieCard'

class WatchLater extends Component {
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
        const { watchLater } = this.props;


        // for (const obj in watchLater) {
        //     const {
        //         src: posterPath,
        //         title,
        //         release: releaseDate,
        //         lang: originalLanguage,
        //         adult,
        //         voteNum: voteCount,
        //         voteAvg: voteAverage,
        //         overview,
        //         id } = watchLater[obj]

        //     return < MovieCard
        //         src={posterPath}
        //         title={title}
        //         release={releaseDate}
        //         lang={originalLanguage}
        //         adult={adult}
        //         voteNum={voteCount}
        //         voteAvg={voteAverage}
        //         overview={overview}
        //         id={id}
        //         key={id}
        //     />

        // }
        if (watchLater && watchLater.length > 0) {
            return watchLater.map(
                (
                    {
                        poster_path: posterPath,
                        title,
                        release_date: releaseDate,
                        original_language: originalLanguage,
                        adult,
                        vote_count: voteCount,
                        vote_average: voteAverage,
                        overview,
                        id
                    }, i
                ) => (
                        <div>
                            <MovieCard
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
                                index={i}
                            />
                        </div >
                    )
            )
        }

        return <div style={{ textAlign: 'center' }
        }> You don´t have any movies in your list yet.</div >;
    }

}
const mapState = (state) => ({
    sessionID: state.userInfo.sessionID,
    watchLater: state.userInfo.watchLater,
})


export default connect(mapState)(withRouter(WatchLater));
