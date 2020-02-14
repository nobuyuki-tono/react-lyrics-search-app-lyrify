import React from "react";

import "../styles/Lyrics.scss";

const Lyrics = ({ lyrics, songTitle }) => {
  return (
    <div className="lyrics">
      <h1 className="lyrics-title">{songTitle}</h1>
      <p className="lyrics-p">{lyrics.lyrics}</p>
    </div>
  );
};

export default Lyrics;
