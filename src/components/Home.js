import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <React.Fragment>
      <h4>Home</h4>
      <p>Daily Claim</p>
      <Link to="game">To Game</Link>
    </React.Fragment>
  );
}

export default Home;