import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const styles = {
    backgroundColor: "#c60019",
    color: "white"
  }

  const buttonStyles = {
    display: "none"
  }
  
  return (
    <React.Fragment>
      <div style={styles}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h2>Daily Pokémon</h2>
            </div>
            <div className="col-md-3">
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
                <div className="col-md-2 float-end">
                  <button style={buttonStyles} type="button"/>
                </div>
                <div className="col-md-2 float-end">
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