import React from "react";
import DisplayCard from "./DisplayCard";

function Collection() {
  return (
    <React.Fragment>
      <div className="text-center">
        <h4>Your Collection</h4>
        <DisplayCard
          height={100}
          link={"https://www.svgrepo.com/show/530495/link.svg"}
          text="Placeholder Text"/>
      </div>
    </React.Fragment>
  );
}

export default Collection;