import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../firebase";

function Home() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getCountFromServer(collection(db, "claims"))
      .then((snap) => setTotal(snap.data().count));
  }, []);

  return (
    <React.Fragment>
      <div className="text-center mt-4">
        <h4>Home</h4>
        <p>Claim one random Pokémon every day and build your collection!</p>
        <p>{total} Pokémon collected globally</p>
        <Link to="game">To Game</Link>
      </div>
    </React.Fragment>
  );
}

export default Home;