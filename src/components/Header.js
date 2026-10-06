import React from "react";
import { NavLink } from "react-router-dom";
import Sun from "./../img/sun.svg";
import Moon from "./../img/moon.svg"
import { themes } from "../context/theme-context";

function Header(props) {
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
                  onClick={() => props.toggleTheme()}
                  style={buttonStyles}
                  type="button">
                    <img
                      src={props.theme === themes.light ? Sun : Moon}
                      height={24}
                      alt={props.theme === themes.light ? "Theme selector with a sun icon." : "Theme selector with a moon icon."}/>
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