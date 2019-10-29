/* eslint-disable import/prefer-default-export */
import { MOVIELIST, SESSIONID } from '../actions/actions'

const initialState = {
    movieList: [],
    page: 1,
    counter: 0,
    sessionID: undefined
}

export const movieListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case MOVIELIST:

            if (state.counter === 0) {
                return {
                    ...state,
                    movieList: [...state.movieList, ...payload.movies],
                    page: payload.page + 1,
                    counter: +1,
                }
            }

            return {
                ...state,
                counter: +1,
                movieList: [...state.movieList, ...payload.movies],
                page: payload.page + 1,
            }


        default:
            return state;


    }
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SESSIONID:
            return {
                ...state,
                sessionID: action.payload
            }
        default:
            return state;
    }
}


