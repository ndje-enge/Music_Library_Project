import React from "react";

const PlaylistList = ({ playlists, setSelectedPlaylist, removePlaylist }) => {
  if (!playlists) {
    return <div>No playlists available</div>;
  }

  return (
    <ul>
      {playlists.map((playlist) => (
        <li key={playlist.id}>
          <span onClick={() => setSelectedPlaylist(playlist)}>{playlist.name}</span>
          <button onClick={() => removePlaylist(playlist.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

export default PlaylistList;
