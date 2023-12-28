import {
    faAngleLeft,
    faAngleRight,
    faPause,
    faPlay,
    faVolumeDown,
    faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import SongForm from "./SongForm";
  
const Player = ({ 
    currentSong, 
    isPlaying, 
    setIsPlaying, 
    audioRef, 
    setSongInfo, 
    songInfo, 
    songs, 
    setCurrentSong, 
    id, 
    setSongs, 
}) => {
    const [volume, setVolume] = useState(0.5);
    //useEffect
    useEffect(() => {
        audioRef.current.volume = volume;
        const newSongs = songs.map((song) => {
          if (song.id === currentSong.id) {
            return {
              ...song,
              active: true,
            };
          } else {
            return {
              ...song,
              active: false,
            };
          }
        });
        setSongs(newSongs);
      }, [currentSong, isPlaying, volume]);
    const addSong = (newSong) => {
        setSongs([...songs, { ...newSong, id: `user-added-${Date.now()}`, active: false }]);
    };

    const volumeHandler = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
      };
      
    const activeLibraryHandler = (nextPrev) => { 
        const newSongs = songs.map((song) => { 
            if (song.id === nextPrev.id) { 
                return { 
                    ...song, 
                    active: true, 
                }; 
            } else { 
                return { 
                    ...song, 
                    active: false, 
                }; 
            } 
        }); 
        setSongs(newSongs); 
        console.log("test"); 
    }; 
    //Event Handlers 
    const dragHandler = (e) => { 
        audioRef.current.currentTime = e.target.value; 
        setSongInfo({ ...songInfo, currentTime: e.target.value }); 
    }; 
    const playSongHandler = () => {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(!isPlaying);
        } else {
          audioRef.current.src = currentSong.audio;
          audioRef.current.currentTime = songInfo.currentTime; 
          audioRef.current.play();
          setIsPlaying(!isPlaying);
        }
      };
  
    const getTime = (time) => 
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2); 
    const skipTrackHandler = async (direction) => { 
        let currentIndex = songs.findIndex( 
            (song) => song.id === currentSong.id 
        ); 
        if (direction === "skip-forward") { 
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]); 
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]); 
        } 
        if (direction === "skip-back") { 
            if ((currentIndex - 1) % songs.length === -1) { 
                await setCurrentSong(songs[songs.length - 1]); 
                // playAudio(isPlaying, audioRef); 
                activeLibraryHandler(songs[songs.length - 1]); 
  
                return; 
            } 
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]); 
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]); 
        } 
        if (isPlaying) audioRef.current.play(); 
    }; 
    //adding the styles 
    const trackAnim = { 
        transform: `translateX(${songInfo.animationPercentage}%)`, 
    }; 
    return ( 
        <div className="player"> 
            <div className="volume-control">
                <FontAwesomeIcon icon={faVolumeDown} />
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={volumeHandler}
                />
                <FontAwesomeIcon icon={faVolumeUp} />
            </div>
            <div className="time-control"> 
                <p>{getTime(songInfo.currentTime)}</p> 
                <div 
                    style={{ 
                        background:  
`linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`, 
                    }} 
                    className="track"
                > 
                    <input 
                        min={0} 
                        max={songInfo.duration || 0} 
                        value={songInfo.currentTime} 
                        onChange={dragHandler} 
                        type="range"
                    /> 
                    <div style={trackAnim} className="animate-track"></div> 
                </div> 
                <p> 
                    {songInfo.duration ? getTime(songInfo.duration) : "00:00"} 
                </p> 
            </div> 
            <div className="play-control"> 
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler("skip-back")} 
                    size="2x"
                    className="skip-back"
                    icon={faAngleLeft} 
                /> 
                {!isPlaying ? ( 
                    <FontAwesomeIcon 
                        onClick={playSongHandler} 
                        size="2x"
                        className="play"
                        icon={faPlay} 
                    /> 
                ) : ( 
                    <FontAwesomeIcon 
                        onClick={playSongHandler} 
                        size="2x"
                        className="pause"
                        icon={faPause} 
                    /> 
                )} 
  
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler("skip-forward")} 
                    size="2x"
                    className="skip-forward"
                    icon={faAngleRight} 
                /> 
            </div>
            <SongForm addSong={addSong} />
        </div>
    );
}; 
  
export default Player;