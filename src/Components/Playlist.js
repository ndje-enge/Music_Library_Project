import React, { useState } from "react";
import "../Styles/playlist.scss";
import PlaylistForm from "./PlaylistForm";
import PlaylistList from "./PlaylistList";
import PlaylistSongs from "./PlaylistSongs";
const Playlist = ({ playlists, setPlaylists, songs, setSongs, setCurrentSong }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const addPlaylist = (newPlaylist) => {
    setPlaylists([...playlists, { ...newPlaylist, id: `playlist-${Date.now()}`, songs: [] }]);
  };

  const removePlaylist = (playlistId) => {
    setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId));
    if (selectedPlaylist && selectedPlaylist.id === playlistId) {
      setSelectedPlaylist(null);
    }
  };

  const addSongToPlaylist = (playlistId, song) => {
    const updatedPlaylists = playlists.map((playlist) => {
      if (playlist.id === playlistId) {
        return { ...playlist, songs: [...playlist.songs, song] };
      }
      return playlist;
    });
    setPlaylists(updatedPlaylists);
  };

  const removeSongFromPlaylist = (playlistId, songId) => {
    const updatedPlaylists = playlists.map((playlist) => {
      if (playlist.id === playlistId) {
        return { ...playlist, songs: playlist.songs.filter((song) => song.id !== songId) };
      }
      return playlist;
    });
    setPlaylists(updatedPlaylists);
  };


  return (
    <div className="playlist-container">
      <div className="playlist-sidebar">
        <h2>Playlists</h2>
        <PlaylistForm addPlaylist={addPlaylist} />
        <PlaylistList
          playlists={playlists}
          setSelectedPlaylist={setSelectedPlaylist}
          removePlaylist={removePlaylist}
        />
      </div>
      {selectedPlaylist && (
        <div className="playlist-detail">
          <h3>{selectedPlaylist.name}</h3>
          <PlaylistSongs
            playlist={selectedPlaylist}
            songs={songs}
            addSongToPlaylist={addSongToPlaylist}
            removeSongFromPlaylist={removeSongFromPlaylist}
            setCurrentSong={setCurrentSong}
          />
        </div>
      )}
    </div>
  );
};

export default Playlist;
