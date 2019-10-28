/* eslint-disable import/prefer-default-export */
import { MOVIELIST, MOVIELISTPAGE } from '../actions/actions'

const initialState = {
    movieList: [],
    page: 1
}

export const movieListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case MOVIELIST:
            console.log(state.page)
            console.log(payload.page)
            if (state.page === payload.page) {
                console.log('Hej');
                return state;
            }

            return {
                ...state,
                movieList: [...state.movieList, ...payload],
            }


        case MOVIELISTPAGE:
            return {
                ...state,
                page: state.page + 1
            }

        default:
            return state;
    }
}


