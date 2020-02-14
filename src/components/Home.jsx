import React, { useState, useEffect } from "react";

import Song from "../components/Song";
import Lyrics from "../components/Lyrics";
import ShowError from "../components/ShowError";

import "../styles/Home.scss";
import axios from "axios";

const apiUrl = "https://api.lyrics.ovh";

const Home = () => {
  const [input, setInput] = useState("");
  const [songs, setSongs] = useState([]);
  const [songTitle, setSongTitle] = useState("");
  const [lyrics, setLyrics] = useState(null);
  const [isError, setIsError] = useState(false);

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
    try {
      setSongTitle(title);
      const data = await axios(`https://api.lyrics.ovh/v1/${artist}/${title}`);
      const song = data.data;
      console.log(song);
      setSongs([]);
      setLyrics(song);
    } catch (err) {
      setSongs([]);
      setLyrics(null);
      setIsError(true);

      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  const getLyrics = async input => {
    try {
      const searchTerm = input.trim();

      const data = await axios(`${apiUrl}/suggest/${searchTerm}`);
      const songs = data.data.data;

      console.log(songs[0].title, songs[0].id);
      setLyrics([]);
      setSongs(songs);
    } catch (err) {
      setLyrics(null);
      setIsError(true);

      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
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
          <input
            onChange={handleChange}
            value={input}
            type="text"
            name="search"
            placeholder="song name or artist name"
          />
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

        {lyrics !== null ? (
          <Lyrics songTitle={songTitle} lyrics={lyrics} />
        ) : (
          ""
        )}
        {isError ? <ShowError /> : ""}
      </div>
    </>
  );
};

export default Home;
