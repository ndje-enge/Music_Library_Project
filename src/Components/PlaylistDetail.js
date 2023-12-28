import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "../Styles/playlistdetail.scss"
const PlaylistDetail = ({ playlists, setPlaylists }) => {
  const { id } = useParams();
  const playlist = playlists.find(p => p.id === id);
  const [newSong, setNewSong] = useState({ name: '', artist: '', url: '' });

  if (!playlist) {
    return <div>Playlist not found.</div>;
  }

  const handleChange = (e) => {
    setNewSong({ ...newSong, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPlaylist = {
      ...playlist,
      songs: [...playlist.songs, { ...newSong, id: `song-${Date.now()}` }]
    };
    setPlaylists(playlists.map(p => p.id === playlist.id ? updatedPlaylist : p));
    setNewSong({ name: '', artist: '', url: '' }); // Reset form
  };

  return (
    <div className="playlist-detail-page">
      <div className="playlist-info">
        <h2>{playlist.name}</h2>

        <div className="add-song-section">
          <h3>Add a Song</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Song Name:
              <input type="text" name="name" value={newSong.name} onChange={handleChange} required />
            </label>
            <label>
              Artist:
              <input type="text" name="artist" value={newSong.artist} onChange={handleChange} required />
            </label>
            <label>
              URL:
              <input type="url" name="url" value={newSong.url} onChange={handleChange} required />
            </label>
            <button type="submit">Add Song</button>
          </form>
        </div>
      </div>

      <div className="playlist-songs">
        <h3>Songs in {playlist.name}</h3>
        <ul>
          {playlist.songs.map(song => (
            <li key={song.id}>{song.name} by {song.artist}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlaylistDetail;
