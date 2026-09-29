import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DisplayCard from "./DisplayCard";
import pokedex from "../pokedexConfig";
import { db } from "../firebase";
import { collection, addDoc, getDoc, doc, Timestamp } from "firebase/firestore";

function Game() {
  const [claimId, setClaimId] = useState(null);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!claimId) return;

    async function fetchClaim() {
      const docRef = doc(db, "claims", claimId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name);
        setImg(data.img);
      } else {
        setError("Claim not found");
      }
    }

    fetchClaim();
  }, [claimId]);

  const getResult = async () => {
    const id = Math.floor(Math.random() * 1025) + 1;
    const shinyResult = Math.floor(Math.random() * 4096);
    
    const result = await pokedex.getPokemonByName(id);
    console.log(result);
    const claim = await addDoc(collection(db, "claims"), {
      name: result.name,
      img: shinyResult === 0 ? result.sprites.front_shiny : result.sprites.front_default,
      timeClaimed: Timestamp.now()
    });
    setClaimId(claim.id);
  }
  
  if (claimId) {
    return (
      <React.Fragment>
        <div className="text-center mt-4">
          <h4>Your Result</h4>
          <DisplayCard
            height={96}
            link={img}
            text={name}/>
          <Link to="/collection">View Collection</Link>
        </div>
      </React.Fragment>
    );
  } else if (error) {
    return (
      <React.Fragment>
        <p>There was an error: {error}</p>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <div className="text-center mt-4">
          <p>Collect your Pokémon</p>
          <button type="button" onClick={getResult}>Claim</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Game;