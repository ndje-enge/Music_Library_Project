import React from "react";

const Song = ({ currentSong }) => {
  return (
    <div className="song-container">
      {currentSong ? (
        <>
          <img src={currentSong.cover} alt={currentSong.name} />
          <h2>{currentSong.name}</h2>
          <h3>{currentSong.artist}</h3>
        </>
      ) : (
        <p>No song selected</p>
      )}
    </div>
  );
};

export default Song;
