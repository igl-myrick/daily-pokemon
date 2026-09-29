import React from "react";

function DisplayCard(props) {
  const { height, link, text } = props;

  const shadow = { filter: "drop-shadow(2px 2px 2px)" }

  return (
    <React.Fragment>
      <img src={link} height={height} style={shadow}/>
      <p>{text}</p>
    </React.Fragment>
  );
}

export default DisplayCard;