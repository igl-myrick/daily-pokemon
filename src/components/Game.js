import React, { useState } from "react";
import { Link } from "react-router-dom";
import DisplayCard from "./DisplayCard";

function Game() {
  const [hasClaimed, setHasClaimed] = useState(false);

  const determineResult = () => {
    const result = Math.floor(Math.random() * 1025) + 1;
    const shinyResult = Math.floor(Math.random() * 4096);
    if (shinyResult === 0) {
      return [result, true];
    } else {
      return [result, false];
    }
  }
  
  if (hasClaimed) {
    return (
      <React.Fragment>
        <div className="text-center mt-4">
          <h4>Your Result</h4>
          <DisplayCard
            height={300}
            link="https://www.svgrepo.com/show/530495/link.svg"
            text="Placeholder Text"/>
          <Link to="/collection">View Collection</Link>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div className="text-center mt-4">
          <p>Collect your Pokémon</p>
          <button type="button" onClick={() => setHasClaimed(true)}>Claim</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Game;