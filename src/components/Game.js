import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DisplayCard from "./DisplayCard";
import pokedex from "../pokedexConfig";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

function Game() {
  const [claimId, setClaimId] = useState(null);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (claimId) {
      const unsub = onSnapshot(
        collection(db, "claims"),
        async (collectionSnapshot) => {
          const claims = [];
          collectionSnapshot.forEach((doc) => {
            claims.push({
              pkmnId: doc.data().pkmnId,
              isShiny: doc.data().isShiny,
              id: doc.id
            });
          });
          const userClaim = claims.find(claim => claim.id === claimId);
          const response = await pokedex.getPokemonByName(userClaim.pkmnId);
          setName(response.name);
          console.log(userClaim);
          const sprite = userClaim.isShiny === true ? response.sprites.front_shiny : response.sprites.
          setImg(sprite);
        },
        (error) => {
          setError(error.message);
        }
      );

      return () => unsub();
    }
  }, [claimId]);

  const getResult = async () => {
    const result = Math.floor(Math.random() * 1025) + 1;
    const shinyResult = Math.floor(Math.random() * 4096);
    if (shinyResult === 0) {
      const claim = await addDoc(collection(db, "claims"), { pkmnId: result, isShiny: true });
      setClaimId(claim.id);
    } else {
      const claim = await addDoc(collection(db, "claims"), { pkmnId: result, isShiny: false });
      setClaimId(claim.id);
    }
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