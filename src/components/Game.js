import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DisplayCard from "./DisplayCard";
import pokedex from "../pokedexConfig";
import { db } from "../firebase";
import { collection, addDoc, getDoc, doc, Timestamp, } from "firebase/firestore";

function Game() {
  const [claimId, setClaimId] = useState(null);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function unsub() {
      if (claimId) {
        const docRef = doc(db, "claims", claimId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setName(docSnap.name);
          setImg(docSnap.img);
        } else {
          setError("Claim not found");
        }
      }
    }
    
    return () => unsub();
  }, [claimId]);

  const getResult = async () => {
    const id = Math.floor(Math.random() * 1025) + 1;
    const isShiny = Math.floor(Math.random() * 4096) === 0 ? true : false;
    console.log(isShiny);
    
    const result = await pokedex.getPokemonByName(id);
    console.log(result);
    return isShiny ? { name: result.name, img: result.sprites.front_shiny } : { name: result.name, img: result.sprites.front_default };
  }

  const setResult = async () => {
    const result = getResult();
    const claim = await addDoc(collection(db, "claims"), { name: result.name, img: result.img, timeClaimed: Timestamp.now() });
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
          <button type="button" onClick={setResult}>Claim</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Game;