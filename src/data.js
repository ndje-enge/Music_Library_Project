import { v4 as uuidv4 } from "uuid";
function chillHop() { 
  return [ 
    { 
      name: "Glimpse of Us", 
      artist: "Joji",
      cover: "./music/Joji - Glimpse of Us.jpeg",
      audio: "./music/Joji - Glimpse of Us.mp3", 
      color: ["#205950", "#2ab3bf"], 
      id: uuidv4(), 
      active: true, 
    },
    { 
        name: "HOPE", 
        artist: "NF", 
        cover: "./music/NF - Hope.jpeg",
        audio: "./music/NF - HOPE.mp3", 
        color: ["#205950", "#2ab3bf"], 
        id: uuidv4(), 
        active: true, 
      },
      { 
        name: "Day One", 
        artist: "Hans Zimmer", 
        cover: "./music/Day one.jpg",
        audio: "./music/Hans Zimmer - Day One (Interstellar Theme).mp3", 
        color: ["#205950", "#2ab3bf"], 
        id: uuidv4(), 
        active: true, 
      },
  ]; 
}
  
export default chillHop; 