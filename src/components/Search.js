import React from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router';
import MovieCard from './MovieCard';
import { Style } from '../style/style.css'



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

    componentDidMount() {
        this.getMovieData();
    }

    componentDidUpdate(prevProps) {
        const { match: {
            params: {
                query
            }
        } } = this.props;
        if (query !== prevProps.match.params.query) {

            this.getMovieData();
        }
    }

    async getMovieData() {
        const { match: {
            params: {
                query
            }
        } } = this.props

        const { results: searchResults } = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=d2530355598301431a821ae172ea0b6f&query=${query}`).then((response) => response.json());

        const movieInfo = searchResults.map(({ id: movieID }) => fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=d2530355598301431a821ae172ea0b6f`).then(response => response.json()))
        const movieInfoList = await Promise.all(movieInfo);

        this.setState({
            movieInfoList
        })
    }

    render() {

        const { movieInfoList } = this.state;

        const { match: { params: { query } } } = this.props;

        if (movieInfoList.length > 0) {

            return movieInfoList.map(
                ({
                    id: movieID,
                    original_language: originalLanguage,
                    overview,
                    release_date: releaseDate,
                    poster_path: posterPath,
                    title,
                    vote_average: voteAvarage,
                }, i) => {

                    return (i % 2 === 0) ?
                        <MovieCard
                            key={movieID}
                            id={movieID}
                            lang={originalLanguage}
                            overview={overview}
                            release={releaseDate}
                            src={posterPath}
                            title={title}
                            voteAvg={voteAvarage}
                            style={Style}
                        />
                        : <MovieCard
                            key={movieID}
                            id={movieID}
                            lang={originalLanguage}
                            overview={overview}
                            release={releaseDate}
                            src={posterPath}
                            title={title}
                            voteAvg={voteAvarage}
                            style={Style}

                        />

                })
        }

        return <p style={{ textAlign: 'center', paddingTop: '10%' }}>No matching results for {query}</p>;

    }
}

export default withRouter(Search);