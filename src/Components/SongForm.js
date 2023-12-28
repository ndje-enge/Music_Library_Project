import React, { useState } from "react";
import "../Styles/songform.scss";

const SongForm = ({ addSong }) => {
  const [songData, setSongData] = useState({
    name: "",
    artist: "",
    audio: "",
    color: ["#205950", "#2ab3bf"],
  });

  const handleChange = (e) => {
    setSongData({ ...songData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addSong(songData);
    setSongData({
      name: "",
      artist: "",
      audio: "",
      color: ["#205950", "#2ab3bf"],
    });
  };

  return (
    <div className="song-form-wrapper">
       
       
    </div>
  );
};

export default SongForm;
