import React from "react";

function DisplayCard(props) {
  const { height, width, link, text } = props;

  return (
    <React.Fragment>
      <img src={link} height={height} width={width}/>
      <p>{text}</p>
    </React.Fragment>
  );
}

export default DisplayCard;