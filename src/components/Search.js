import React from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import MovieCard from './MovieCard';


class Search extends React.Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                query: PropTypes.string.isRequired
            }).isRequired,
        }).isRequired
    }

    constructor() {
        super();
        this.state = {
            movieInfoList: []

        }
    }

    async componentDidMount() {
        const { match: {
            params: {
                query
            }
        } } = this.props

        const { results: searchResults } = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=d2530355598301431a821ae172ea0b6f&query=${query}`).then((response) => response.json())

        const movieInfo = searchResults.map(async ({ id: movieID }) => fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=d2530355598301431a821ae172ea0b6f`).then(response => response.json()))

        const movieInfoList = await Promise.all(movieInfo);

        this.setState({
            movieInfoList
        })
    }

    render() {

        const { movieInfoList } = this.state;

        if (movieInfoList) {
            console.log(movieInfoList);
            return movieInfoList.map(
                ({
                    id: movieID,
                    original_language: originalLanguage,
                    overview,
                    release_date: releaseDate,
                    poster_path: posterPath,
                    title,
                    vote_average: voteAvarage
                }) => {
                    return (
                        <div>
                            <MovieCard
                                key={movieID}
                                id={movieID}
                                lang={originalLanguage}
                                overview={overview}
                                release={releaseDate}
                                src={posterPath}
                                title={title}
                                voteAvg={voteAvarage}
                            />
                        </div>)
                })
        }

        return null;
    }
}

export default withRouter(Search);