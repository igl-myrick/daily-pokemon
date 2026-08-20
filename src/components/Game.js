import React, { useState } from "react";
import { Link } from "react-router-dom";

function Game() {
  const [hasClaimed, setHasClaimed] = useState(false);
  
  if (hasClaimed) {
    return (
      <React.Fragment>
        <Link to="/collection">View Collection</Link>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Collect your Pokémon</p>
        <button type="button" onClick={() => setHasClaimed(true)}>Claim</button>
      </React.Fragment>
    );
  }
}

export default Game;