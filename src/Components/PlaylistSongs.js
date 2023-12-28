import React from "react";

const PlaylistSongs = ({ playlist, songs, addSongToPlaylist, removeSongFromPlaylist, setCurrentSong }) => {
  const addSongHandler = (song) => {
    addSongToPlaylist(playlist.id, song);
  };

  const removeSongHandler = (songId) => {
    removeSongFromPlaylist(playlist.id, songId);
  };

  return (
    <div>
      <h4>Songs in {playlist.name}</h4>
      <ul>
        {playlist.songs.map((song) => (
          <li key={song.id}>
            <span>{song.name}</span>
            <button onClick={() => setCurrentSong(song)}>Play</button>
            <button onClick={() => removeSongHandler(song.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h4>Add a Song to {playlist.name}</h4>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <span>{song.name}</span>
            <button onClick={() => addSongHandler(song)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistSongs;
