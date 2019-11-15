import { normalize, schema } from 'normalizr';

import { SESSIONID, USERINFO, FAVORITES, WATCH_LATER } from '../actions/actions'

const localData = {
  favorites: sessionStorage.getItem('favoriteStorage'),
  watchLater: sessionStorage.getItem('watchLaterStorage')
}

export const initialState = {
  sessionID: sessionStorage.getItem('sessionIDStorage') || '',
  username: undefined,
  favorites: localData.favorites ? JSON.parse(localData.favorites) : {},
  watchLater: localData.watchLater ? JSON.parse(localData.watchLater) : [],
}


export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SESSIONID:
      sessionStorage.setItem('sessionIDStorage', payload);
      return {
        ...state,
        sessionID: payload,
      }

    case USERINFO:
      return {
        ...state,
        username: payload.username,
      }

    case FAVORITES:
      // const myData = { favorites: payload };
      // const favoriteEntity = new schema.Entity('favorites');
      // const mySchema = { favorites: [favoriteEntity] };
      // const normalizedData = normalize(myData, mySchema);

      sessionStorage.setItem('favoriteStorage', JSON.stringify(payload));
      return {
        ...state,
        favorites: payload,
      }

    case WATCH_LATER:
      sessionStorage.setItem('watchLaterStorage', JSON.stringify(payload));

      return {
        ...state,
        watchLater: payload,
      }

    default:
      return state;
  }
}