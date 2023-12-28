import { useEffect, useRef, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Library from './Components/Library';
import Nav from './Components/Navb';
import Player from './Components/PlayerSong';
import Playlist from './Components/Playlist';
import PlaylistDetail from './Components/PlaylistDetail';
import SearchBar from './Components/SearchBar';
import Song from './Components/Song';
import './Styles/app.scss';
import data from './data';

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [playlists, setPlaylists] = useState([]);

  const addPlaylist = (newPlaylist) => {
    setPlaylists(prevPlaylists => [...prevPlaylists, newPlaylist]);
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentage = roundedDuration > 0 ? Math.round((roundedCurrent / roundedDuration) * 100) : 0;
    setSongInfo({
      ...songInfo,
      currentTime: roundedCurrent,
      duration: roundedDuration,
      animationPercentage: animationPercentage,
    });
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  useEffect(() => {
    const newFilteredSongs = songs.filter((song) =>
      song.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSongs(newFilteredSongs);
  }, [searchQuery, songs, setFilteredSongs]);

  return (
    <Router>
      <div className="app-container">
        <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
        
        <Routes>
          <Route path="/" element={
            <>
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setFilteredSongs={setFilteredSongs}
                songs={songs}
              />
              <Song currentSong={currentSong} />
              <Player
                id={songs.id}
                songs={filteredSongs}
                songInfo={songInfo}
                setSongInfo={setSongInfo}
                audioRef={audioRef}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                setSongs={setSongs}
              />
              <Library
                libraryStatus={libraryStatus}
                setLibraryStatus={setLibraryStatus}
                setSongs={setSongs}
                isPlaying={isPlaying}
                audioRef={audioRef}
                songs={filteredSongs}
                setCurrentSong={setCurrentSong}
              />
            </>
          } />
          <Route path="/playlist/:id" element={<PlaylistDetail playlists={playlists} />} />
        </Routes>

        <div className="playlist-container-wrapper">
          <Playlist playlists={playlists} setPlaylists={setPlaylists} addPlaylist={addPlaylist} />
        </div>

        <audio
          onLoadedMetadata={timeUpdateHandler}
          onTimeUpdate={timeUpdateHandler}
          ref={audioRef}
          src={currentSong.audio}
          onEnded={songEndHandler}
        ></audio>
      </div>
    </Router>
  );
}

export default App;
