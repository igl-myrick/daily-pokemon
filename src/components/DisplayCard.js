import React, { useContext } from "react";
import { ThemeContext } from "../context/theme-context";

function DisplayCard(props) {
  const { height, link, text } = props;

  const theme = useContext(ThemeContext);

  const shadow = theme.backgroundColor === "white" ? { filter: "drop-shadow(2px 2px 2px)" } : { filter: "drop-shadow(2px 2px 2px #808080"};

  return (
    <React.Fragment>
      <img src={link} height={height} style={shadow} alt={`Sprite of ${text}.`}/>
      <p>{text}</p>
    </React.Fragment>
  );
}

export default DisplayCard;