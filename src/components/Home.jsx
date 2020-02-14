import React, { useState, useEffect } from "react";

import Song from "../components/Song";
import Lyrics from "../components/Lyrics";

import "../styles/Home.scss";
import axios from "axios";

const apiUrl = "https://api.lyrics.ovh";

const Home = () => {
  const [input, setInput] = useState("");
  const [songs, setSongs] = useState([]);
  const [lyrics, setLyrics] = useState(null);

  // useEffect(() => {
  //   async function getLyrics(input) {
  //     const searchTerm = input.trim();

  //     const data = await axios(`${apiUrl}/suggest/${searchTerm}`);
  //     const songs = data.data.data;

  //     console.log(songs[0].title, songs[0].id);
  //     setSongs([songs]);
  //   }
  // }, []);

  const getSong = async (artist, title) => {
    const data = await axios(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    const song = data.data;
    console.log(song);
    setSongs([]);
    setLyrics(song);
  };

  const getLyrics = async input => {
    const searchTerm = input.trim();

    const data = await axios(`${apiUrl}/suggest/${searchTerm}`);
    const songs = data.data.data;

    console.log(songs[0].title, songs[0].id);
    setSongs(songs);
  };

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSearch = e => {
    e.preventDefault();

    if (input === "") {
      alert("Please enter search keyword");
    } else {
      getLyrics(input);
    }
  };

  return (
    <>
      <div className="home">
        <div className="home-heading">
          <h1>Lyrify</h1>
          <h2>Find and Sing!!</h2>
        </div>

        <div className="input-div">
          <input onChange={handleChange} type="text" name="search" />
          <button onClick={handleSearch} className="search-btn" type="submit">
            <i className="fas fa-search icon"></i>
          </button>
        </div>
      </div>
      <div className="song-container">
        {songs
          ? songs.map(song => (
              <Song
                key={song.id}
                songId={song.id}
                songTitle={song.title}
                artist={song.artist.name}
                getSong={getSong}
              />
            ))
          : ""}

        {lyrics !== null ? <Lyrics lyrics={lyrics} /> : ""}
      </div>
    </>
  );
};

export default Home;
