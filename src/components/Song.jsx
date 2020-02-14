import React, { useState } from "react";

import "../styles/Song.scss";

const Song = ({ songId, songTitle, artist, getSong }) => {
  const handleClick = () => {
    getSong(artist, songTitle);
  };

  return (
    <div className="song">
      <div className="song-info">
        <h1>
          {songTitle} / {artist}
        </h1>
      </div>

      <div className="song-btn">
        <button onClick={handleClick}>Get Lyrics</button>
      </div>
    </div>
  );
};

export default Song;
