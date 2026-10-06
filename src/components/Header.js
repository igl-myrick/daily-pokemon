import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Sun from "./../img/sun.svg";
import Moon from "./../img/moon.svg"

function Header() {
  const [isLight, setIsLight] = useState(true);

  const buttonStyles = {
    all: "unset"
  }

  const wrapperStyles = {
    position: "relative",
    display: "inline-block"
  }
  
  return (
    <React.Fragment>
      <div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3">
              <h2 className="text-center">Daily Pokémon</h2>
            </div>
            <div className="col-md-3 text-center">
              <div className="row">
                <div className="col pb-1">
                  <NavLink className="nav-link" to="/">Home</NavLink>
                </div>
                <div className="col">
                  <NavLink className="nav-link" to="game">Game</NavLink>
                </div>
                <div className="col">
                  <NavLink className="nav-link" to="collection">Collection</NavLink>
                </div>
              </div>
            </div>
            <div className="col-md-4"/>
            <div className="col-md-2 d-flex justify-content-around">
              <div className="col-md-9 float-start">
                <NavLink className="nav-link" to="account">Manage account</NavLink>
              </div>
              <div className="col-md-3" style={wrapperStyles}>
                <button
                  onClick={() => setIsLight(!isLight)}
                  style={buttonStyles}
                  type="button">
                    <img
                      src={isLight ? Sun : Moon}
                      height={24}
                      alt={isLight ? "Theme selector with a sun icon." : "Theme selector with a moon icon."}/>
                </button>
              </div>
            </div>
          <hr/>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Header;