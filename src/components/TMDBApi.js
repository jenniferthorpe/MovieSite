import React from 'react'

export class TMDBApi extends React.Component {


    static getTrending({ timeWindow, page }) {
        return TMDBApi.fetchData({ url: 'trending/movies/', parameters: timeWindow, url2: '', queryString: `page=${page}` });
    }

    static getMovieDetails({ movieID }) {
        return TMDBApi.fetchData({ url: 'movie/', parameters: movieID })
    }

    static getReviews({ movieID }) {
        return TMDBApi.fetchData({ url: 'movie/', parameters: movieID, url2: '/reviews' })
    }

    static getSimilar({ movieID, page }) {
        return TMDBApi.fetchData({ url: 'movie/', parameters: movieID, url2: '/similar', queryString: `page=${page}` })
    }

    static logInToken() {
        return TMDBApi.fetchData({ url: 'authentication/token/new' })
    }

    static logInResponse({ username, password, token }) {
        return TMDBApi.postData({ url: 'authentication/token/validate_with_login', username, password, token })
    }

    static getSessionID({ token }) {
        return TMDBApi.postData({ url: 'authentication/session/new', token })
    }

    static getTrailerVideo({ movieID }) {
        return TMDBApi.fetchData({ url: 'movie/', parameters: movieID, url2: '/videos' })
    }

    static searchResults({ query }) {
        return TMDBApi.fetchData({ url: 'search/movie/', queryString: `query=${query}` })
    }

    static getFavorites({ sessionID }) {
        return TMDBApi.fetchData({ url: 'account/{account_id}/favorite/movies', queryString: `session_id=${sessionID}` })
    }

    static addFavorite({ sessionID, movieIDMedia, bool }) {
        return TMDBApi.postDataLists({ url: 'account/{account_id}/favorite', queryString: `session_id=${sessionID}`, movieIDMedia, bool })
    }

    static getWatchLater({ sessionID }) {
        return TMDBApi.fetchData({ url: 'account/{account_id}/watchlist/movies', queryString: `session_id=${sessionID}` })
    }

    static addWatchLater({ sessionID, movieIDMedia, bool }) {
        return TMDBApi.postDataLists({ url: 'account/{account_id}/watchlist', queryString: `session_id=${sessionID}`, movieIDMedia, bool })
    }




    static async fetchData({ url = '', parameters = '', url2 = '', queryString = '' }) {
        return fetch(`https://api.themoviedb.org/3/${url}${parameters}${url2}?api_key=d2530355598301431a821ae172ea0b6f&${queryString}`).then(response => response.json());
    }

    static async postData({ url = '', parameters = '', url2 = '', queryString = '', username = '', password = '', token = '' }) {
        return fetch(`https://api.themoviedb.org/3/${url}${parameters}${url2}?api_key=d2530355598301431a821ae172ea0b6f&${queryString}`, {
            method: 'POST',
            body: JSON.stringify(
                {
                    'username': username,
                    'password': password,
                    'request_token': token,
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        })

    }

    static async postDataLists({ url = '', parameters = '', url2 = '', queryString = '', movieIDMedia = '', bool = '' }) {
        return fetch(`https://api.themoviedb.org/3/${url}${parameters}${url2}?api_key=d2530355598301431a821ae172ea0b6f&${queryString}`, {
            method: 'POST',
            body: JSON.stringify(
                {
                    'media_type': 'movie',
                    'media_id': Number(movieIDMedia),
                    'favorite': bool
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        })

    }






}

