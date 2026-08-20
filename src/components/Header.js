import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <React.Fragment>
      <h2>Daily Pokémon</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="game">Game</Link>
        </li>
        <li>
          <Link to="collection">Collection</Link>
        </li>
        <li>
          <Link to="account">Manage account</Link>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default Header;