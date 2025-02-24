import React from 'react';
import '../styles/SearchHistory.css';

const SearchHistory = ({ searchHistory, setCity }) => {
  return (
    <div className="search-history">
      <h2>Search History</h2>
      {searchHistory.map((history, index) => (
        <div key={index} className="history" onClick={() => setCity(history)}>
          <p>{history}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchHistory;