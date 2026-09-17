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

  const getResult = async (id) => {
    const result = await pokedex.getPokemonByName(id);
    const pkmn = { name: result.name, sprite: result.sprites.front_default }
    return pkmn;
  }

  const handleClick = () => {
    const outcome = determineResult();
    const result = getResult(outcome[0]);
    console.log(result);
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