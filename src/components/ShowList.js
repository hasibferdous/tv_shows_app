import React, { useState, useEffect } from "react";
import axios from "axios";

const ShowList = ({ history }) => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get("https://api.tvmaze.com/search/shows?q=all").then((response) => {
      setShows(response.data);
    });
  }, []);

  const handleShowClick = (id) => {
    history.push(`/shows/${id}`);
  };

  return (
    <div className="container">
      <h1>TV Shows</h1>
      {shows.map((show) => (
        <div key={show.show.id} className="show" onClick={() => handleShowClick(show.show.id)}>
          <h2>{show.show.name}</h2>
          {show.show.image && <img src={show.show.image.medium} alt={show.show.name} />}
          <p>{show.show.premiered}</p>
          <p>{show.show.language}</p>
        </div>
      ))}
    </div>
  );
};

export default ShowList;
