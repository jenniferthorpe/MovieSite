/* eslint-disable camelcase */
import React from 'react';

export class MyDb extends React.Component {
  static getFavorite() {
    return MyDb.getFavorites();
  }

  static addFavorite({ poster_path, title, release_date, original_language, vote_count, vote_average, overview, movieID, sessionID }) {
    return MyDb.postFavorite({ poster_path, title, release_date, original_language, vote_count, vote_average, overview, movieID, sessionID })
  }

  static addFavoritesBulk(favoritesArr) {
    return MyDb.postFavoritesBulk(favoritesArr)
  }

  static removeFavorite({ movieID, sessionID }) {
    return MyDb.deleteFavorite({ movieID, sessionID })
  }





  static async pgetFavorites() {
    return fetch('http://localhost:4500/v1/all')
  }

  static async postFavorite({ poster_path, title, release_date, original_language, vote_count, vote_average, overview, movieID, sessionID }) {
    return fetch('http://localhost:4500/v1/new/favorite', {
      method: 'POST',
      body: JSON.stringify(
        {
          poster_path,
          title, release_date,
          original_language,
          vote_count,
          vote_average,
          overview,
          movieID,
          sessionID
        },
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  static async postFavoritesBulk(favoritesArr) {
    return fetch('http://localhost:4500/v1/new/favorite/list', {
      method: 'POST',
      body: JSON.stringify(
        favoritesArr
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  static async deleteFavorite({ movieID, sessionID }) {
    return fetch('http://localhost:4500/v1/delete/favorite', {
      method: 'DELETE',
      body: JSON.stringify(
        {
          movieID,
          sessionID
        },
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    )
  }

}
