import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlaylistForm = ({ addPlaylist }) => {
  const [playlistName, setPlaylistName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlaylist = { name: playlistName, id: `playlist-${Date.now()}` };
    addPlaylist(newPlaylist);
    setPlaylistName('');
    navigate(`/playlist/${newPlaylist.id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Playlist Name:
        <input type="text" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} required />
      </label>
      <button type="submit">Add Playlist</button>
    </form>
  );
};

export default PlaylistForm;
