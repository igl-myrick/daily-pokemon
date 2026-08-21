import React from "react";
import DisplayCard from "./DisplayCard";

function Collection() {
  return (
    <React.Fragment>
      <h4>Your Collection</h4>
      <DisplayCard
        height={200}
        link={"https://www.svgrepo.com/show/530495/link.svg"}
        text="Placeholder Text"/>
    </React.Fragment>
  );
}

export default Collection;