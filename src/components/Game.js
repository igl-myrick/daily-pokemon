import React, { useState } from "react";
import { Link } from "react-router-dom";
import DisplayCard from "./DisplayCard";
import pokedex from "../pokedexConfig";

function Game() {
  const [hasClaimed, setHasClaimed] = useState(false);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  const determineResult = () => {
    const result = Math.floor(Math.random() * 1025) + 1;
    const shinyResult = Math.floor(Math.random() * 4096);
    if (shinyResult === 0) {
      return [result, true];
    } else {
      return [result, false];
    }
  }

  const getResult = async () => {
    const result = await pokedex.getPokemonByName(determineResult()[0]);
    const pkmn = { name: result.name, sprite: result.sprites.front_default }
    setName(pkmn.name);
    setImg(pkmn.sprite);
    return setHasClaimed(true);
  }
  
  if (hasClaimed) {
    return (
      <React.Fragment>
        <div className="text-center mt-4">
          <h4>Your Result</h4>
          <DisplayCard
            height={96}
            link={img}
            text={name}/>
          <Link to="/collection">View Collection</Link>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div className="text-center mt-4">
          <p>Collect your Pokémon</p>
          <button type="button" onClick={getResult}>Claim</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Game;