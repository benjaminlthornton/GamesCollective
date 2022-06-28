import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

function MyCollectionSearch({
  genres, categories, statuses, setFilters,
}) {
  const [search, setSearch] = useState('');
  // set submit handler
  const submitSearch = (e) => {
    e.preventDefault();
    setFilters(search);
  };

  // set search string
  const searchHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filterHandler = (e) => {
    e.preventDefault();
    if (e.target.id === 'genre') {
      setFilters(null, e.target.value);
    }
    if (e.target.id === 'category') {
      setFilters(null, null, e.target.value);
    }
    if (e.target.id === 'status') {
      setFilters(null, null, null, e.target.value);
    }
  };

  return (
    <div>
      <label htmlFor="title">
        <input type="text" placeholder="Search for a title" id="title" onChange={searchHandler} />
      </label>
      <label htmlFor="searchTitle" />
      <button id="searchTitle" type="button" onClick={submitSearch}>
        <AiOutlineSearch />
      </button>

      <label htmlFor="genre">
        <select name="filters" id="genre" onChange={filterHandler}>
          <option value="" disabled defaultValue="" hidden>Choose a genre</option>
          {genres.map((genre) => (
            <option value={genre}>{genre}</option>
          ))}
        </select>
      </label>
      <label htmlFor="category">
        <select name="filters" id="category" onChange={filterHandler}>
          <option value="" disabled defaultValue="" hidden>Choose a genre</option>
          {categories.map(category => (
            <option value={category}>{category}</option>
          ))}
        </select>
      </label>
      <label htmlFor="status">
        <select name="filters" id="status" onChange={filterHandler}>
          <option value="" disabled defaultValue="" hidden>Choose a genre</option>
          {statuses.map(status => (
            <option value={status}>{status}</option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default MyCollectionSearch;
