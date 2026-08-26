import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <React.Fragment>
      <div className="text-center mt-4">
        <h4>Home</h4>
        <p>Daily Claim</p>
        <Link to="game">To Game</Link>
      </div>
    </React.Fragment>
  );
}

export default Home;