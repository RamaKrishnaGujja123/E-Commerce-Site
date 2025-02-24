import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ setCity }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setCity(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;