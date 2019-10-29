/* eslint-disable import/prefer-default-export */
const APP_PREFIX = 'APP';
export const MOVIELIST = `${APP_PREFIX}/MOVIELIST`;
export const SESSIONID = `${APP_PREFIX}/SESSIONID`;

export const movieListAction = ({ movies, page }) => ({
    type: MOVIELIST,
    payload: {
        movies,
        page,
    }
})

export const sessionIDAction = (userSessionID) => ({
    type: SESSIONID,
    payload: userSessionID
})





