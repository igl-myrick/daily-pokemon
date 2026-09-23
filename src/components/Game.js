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
        (collectionSnapshot) => {
          const claims = [];
          collectionSnapshot.forEach((doc) => {
            claims.push({
              name: doc.data().name,
              img: doc.data().img,
              id: doc.id
            });
          });
          const userClaim = claims.find(claim => claim.id === claimId);
          setName(userClaim.name);
          setImg(userClaim.img);
        },
        (error) => {
          setError(error.message);
        }
      );

      return () => unsub();
    }
  }, [claimId]);

  const determineResult = () => {
    const result = Math.floor(Math.random() * 1025) + 1;
    const shinyResult = Math.floor(Math.random() * 4096);
    if (shinyResult === 0) {
      return [result, true];
    } else {
      return [result, false];
    }
  }

  const getResult = async () => {
    const result = determineResult();
    const response = await pokedex.getPokemonByName(result[0]);
    if (result[1] === false) {
      const claim = await addDoc(collection(db, "claims"), { name: response.name, img: response.sprites.front_default});
      setClaimId(claim.id);
    } else {
      const claim = await addDoc(collection(db, "claims"), { name: response.name, img: response.sprites.front_shiny});
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