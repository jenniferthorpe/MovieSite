const APP_PREFIX = 'APP';
const MOVIELIST = APP_PREFIX + '/MOVIELIST';

const movieList = (movies) => ({
    type: MOVIELIST,
    payload: movies
})