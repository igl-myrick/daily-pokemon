import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DisplayCard from "./DisplayCard";
import pokedex from "../pokedexConfig";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

function Game() {
  const [hasClaimed, setHasClaimed] = useState(false);
  const [claimId, setClaimId] = useState(null);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [error, setError] = useState(null);

  const determineResult = () => {
    const result = Math.floor(Math.random() * 1025) + 1;
    const shinyResult = Math.floor(Math.random() * 4096);
    if (shinyResult === 0) {
      return [result, true];
    } else {
      return [result, false];
    }
  }

  useEffect(() => {
    if (hasClaimed) {
      const unsub = onSnapshot(
        collection(db, "claims"),
        (collectionSnapshot) => {
          const results = [];
          collectionSnapshot.forEach((doc) => {
            results.push({
              name: doc.data().name,
              img: doc.data().img,
              id: doc.id
            });
          });
          const userClaim = results.find(results => results.id === claimId);
          setName(userClaim.name);
          setImg(userClaim.img);
        },
        (error) => {
          setError(error.message);
        }
      );

      return () => unsub();
    }
  }, []);

  const getResult = async () => {
    const result = determineResult();
    const response = await pokedex.getPokemonByName(result[0]);
    // setName(response.name);
    if (result[1] === false) {
      const claim = await addDoc(collection(db, "claims"), { name: response.name, img: response.sprites.front_default});
      setClaimId(claim.id);
      // setImg(response.sprites.front_default);
    } else {
      const claim = await addDoc(collection(db, "claims"), { name: response.name, img: response.sprites.front_shiny});
      setClaimId(claim.id);
      // setImg(response.sprites.front_shiny);
    }
    return setHasClaimed(true);
  }
  
  if (hasClaimed) {
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