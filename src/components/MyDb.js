import React from 'react';

export class MyDb extends React.Component {
  static getFavorite() {
    return MyDb.getFavorites();
  }
  static addFavorite({ poster_path, title, release_date, original_language, vote_count, vote_average, overview, movieID }) {
    return MyDb.postFavorites({ poster_path, title, release_date, original_language, vote_count, vote_average, overview, movieID })
  }





  static async pgetFavorites() {
    return fetch('http://localhost:4500/v1/all')
  }

  static async postFavorites({ poster_path, title, release_date, original_language, vote_count, vote_average, overview, movieID }) {
    return fetch('http://localhost:4500/v1/new/favorite', {
      method: 'POST',
      body: JSON.stringify(
        {
          poster_path, title, release_date, original_language, vote_count, vote_average, overview, movieID
        },
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    )
  }

}
