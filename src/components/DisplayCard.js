import React from "react";

function DisplayCard(props) {
  const { height, link, text } = props;

  return (
    <React.Fragment>
      <img src={link} height={height}/>
      <p>{text}</p>
    </React.Fragment>
  );
}

export default DisplayCard;