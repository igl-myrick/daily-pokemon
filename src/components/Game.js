import React, { useState } from "react";
import { Link } from "react-router-dom";
import DisplayCard from "./DisplayCard";
import pokedex from "../pokedexConfig";

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

  const getResult = (id) => {
    pokedex.getPokemonByName(id)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  const handleClick = () => {
    const outcome = determineResult();
    console.log(getResult(outcome[0]));
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
          <button type="button" onClick={handleClick}>Claim</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Game;