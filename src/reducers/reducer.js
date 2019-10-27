const initialState = {
    movieList: [],
    page: 1
}

const fetchMoviesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case MOVIELIST:
            return {
                ...state,
                movieList: state.movieList + payload
            }
            break;

        default:
            break;
    }
}