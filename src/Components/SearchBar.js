import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery, setFilteredSongs, songs }) => {
  const searchHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const newFilteredSongs = songs.filter((song) =>
        song.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSongs(newFilteredSongs);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search songs..."
        value={searchQuery}
        onChange={searchHandler}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
