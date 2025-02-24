import React from 'react';
import '../styles/Favorites.css';

const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="favorites">
      <h2>Favorites</h2>
      {favorites.map((favorite, index) => (
        <div key={index} className="favorite">
          <p>{favorite}</p>
          <button onClick={() => removeFromFavorites(favorite)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;