import React, { useState, useEffect } from "react";
import axios from "axios";

const ShowDetails = ({ match }) => {
  const [show, setShow] = useState(null);

  useEffect(() => {
    axios.get(`https://api.tvmaze.com/shows/${match.params.id}?embed=cast`).then((response) => {
      setShow(response.data);
    });
  }, [match.params.id]);

  const handleBookingClick = () => {
    localStorage.setItem("movie", show.name);
    localStorage.setItem("details", JSON.stringify({ premiered: show.premiered, language: show.language }));
    // Redirect to booking form
  };

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>{show.name}</h1>
      {show.image && <img src={show.image.medium} alt={show.name} />}
      <p dangerouslySetInnerHTML={{ __html: show.summary }}></p>
      <button onClick={handleBookingClick}>Book a Movie Ticket</button>
    </div>
  );
};

export default ShowDetails;
