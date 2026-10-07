import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DisplayCard from "./DisplayCard";
import pokedex from "../pokedexConfig";
import { auth, db } from "../firebase";
import { collection, addDoc, getDoc, doc, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getNextReset } from "./ResetTracker";

function Game() {
  const [loading, setLoading] = useState(false);
  const [claimId, setClaimId] = useState(null);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [error, setError] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [resetTime, setResetTime] = useState(null);

  useEffect(() => {
    if (!claimId) return;

    async function fetchClaim() {
      const docRef = doc(db, "claims", claimId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name);
        setImg(data.img);
        setResetTime(data.timeOfReset);
        setLoading(false);
      } else {
        setError("Claim not found");
      }
    }

    fetchClaim();
  }, [claimId]);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => listen();
  }, []);

  const getResult = async () => {
    const id = Math.floor(Math.random() * 1025) + 1;
    const isShiny = Math.floor(Math.random() * 4096);
    
    const pkmnResult = await pokedex.getPokemonByName(id);
    const speciesResult = await pokedex.getPokemonSpeciesByName(id);

    const name = speciesResult.names.find(n => n.language.name === "en").name;
    const img = isShiny ? pkmnResult.sprites.front_default : pkmnResult.sprites.front_shiny;

    const claim = await addDoc(collection(db, "claims"), {
      name: name,
      img: img,
      timeClaimed: Timestamp.now(),
      timeOfReset: Timestamp.fromDate(getNextReset()),
      userId: auth.currentUser.uid
    });
    setClaimId(claim.id);
    setLoading(true);
  }

  const handleReset = () => {
    if (resetTime > Date.now()) {
      return;
    } else {
      setClaimId(null);
      setName("");
      setImg("");
      setResetTime(null);
    }
  }

  const imgStyle = {
    height: "96px",
    width: "96px"
  }
  
  if (!authUser) {
    return (
      <React.Fragment>
        <div className="text-center pt-4">
          <h4>Game</h4>
          <p><Link to="/account">Sign in or register</Link> to start claiming.</p>
        </div>
      </React.Fragment>
    );
  } else if (loading) {
    return (
      <React.Fragment>
        <div className="d-flex justify-content-center">
          <div className="text-center mt-4 w-25">
            <h4 className="placeholder-glow">
              <span className="placeholder col-6"/>
            </h4>
            <p className="placeholder-glow">
              <span className="placeholder col-8" style={imgStyle}></span><br/>
              <span className="placeholder col-4"/>
              <span className="placeholder col-6"/>
              <span className="placeholder col-8"/>
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  } else if (claimId) {
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
    );
  } else {
    return (
      <React.Fragment>
        <div className="text-center mt-4">
          <h4>Game</h4>
          <p>Collect your Pokémon</p>
          <button type="button" className="btn btn-gradient" onClick={getResult}>Claim</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Game;