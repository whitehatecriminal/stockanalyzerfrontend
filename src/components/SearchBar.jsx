import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useSearch } from './SearchContext';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const { setSearchQuery } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      setSearchQuery(query);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Enter company name (e.g., Rolex Rings)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="search-button"
          disabled={isLoading || !query.trim()}
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
