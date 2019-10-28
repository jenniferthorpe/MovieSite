/* eslint-disable import/prefer-default-export */
const APP_PREFIX = 'APP';
export const MOVIELIST = `${APP_PREFIX}/MOVIELIST`;
export const MOVIELISTPAGE = `${APP_PREFIX}/MOVIELISTPAGE`;

export const movieListAction = ({ movies, page }) => ({
    type: MOVIELIST,
    payload: {
        movies,
        page
    }
})

export const movieListPageAction = (page) => ({
    type: MOVIELISTPAGE,
    payload: page
})

