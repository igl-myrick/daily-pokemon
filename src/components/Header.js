import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sun from "./../img/sun.svg";
import Moon from "./../img/moon.svg"

function Header() {
  const [isLight, setIsLight] = useState(true);

  const styles = {
    backgroundColor: "#c60019",
    color: "white"
  }

  const buttonStyles = {
    display: "none"
  }

  const wrapperStyles = {
    position: "relative",
    display: "inline-block"
  }
  
  return (
    <React.Fragment>
      <div style={styles}>
        <div className="container">
          <div className="row">
            <div className="col-md-3 text-center">
              <h2>Daily Pokémon</h2>
            </div>
            <div className="col-md-3 text-center">
              <div className="row">
                <div className="col">
                  <Link to="/">Home</Link>
                </div>
                <div className="col">
                  <Link to="game">Game</Link>
                </div>
                <div className="col">
                  <Link to="collection">Collection</Link>
                </div>
              </div>
            </div>
            <div className="col">
                <div className="col-md-2 float-end" style={wrapperStyles}>
                  <button style={buttonStyles} onClick={() => setIsLight(!isLight)} type="button"/>
                  <img src={isLight ? Sun : Moon} height={32}/>
                </div>
                <div className="col float-end">
                  <Link to="account">Manage account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Header;