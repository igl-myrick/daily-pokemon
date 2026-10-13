import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DisplayCard from "./DisplayCard";
import pokedex from "../pokedexConfig";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, query, where, limit, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Game() {
  const [loading, setLoading] = useState(true);
  const [claim, setClaim] = useState(null);
  const [error, setError] = useState(null);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    if (!authUser) return;

    const claim = query(
      collection(db, "claims"),
      where("userId", "==", authUser.uid),
      where("timeOfReset", ">", Timestamp.now()),
      limit(1)
    );

    getDocs(claim)
      .then((snap) => !snap.empty && setClaim(snap.docs[0].data()))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [authUser]);

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
    setLoading(true);
    const id = Math.floor(Math.random() * 1025) + 1;
    const isShiny = Math.floor(Math.random() * 4096);

    const pkmnResult = await pokedex.getPokemonByName(id);
    const speciesResult = await pokedex.getPokemonSpeciesByName(id);

    const name = speciesResult.names.find(n => n.language.name === "en").name;
    const img = isShiny ? pkmnResult.sprites.front_default : pkmnResult.sprites.front_shiny;

    const result = {
      name: name,
      img: img,
      timeClaimed: Timestamp.now(),
      timeOfReset: Timestamp.fromDate(getNextReset()),
      userId: auth.currentUser.uid
    };
    await addDoc(collection(db, "claims"), result);
    setClaim(result);
    setLoading(false);
  }

  const getNextReset = (now = new Date()) => {
    const nextDay = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      19 // 7pm UTC
    ));
    if (nextDay <= now) {
      nextDay.setUTCDate(nextDay.getUTCDate() + 1);
    }
    return nextDay;
  }

  const getHoursRemaining = (target) => {
    const hoursInMs = Math.ceil((target - Date.now()) / 3600000);
    return hoursInMs <= 1 ? "less than 1 hour" : `${hoursInMs} hours`;
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
              <span className="placeholder col-8"/>
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  } else if (error) {
    return (
      <React.Fragment>
        <p>There was an error: {error}</p>
      </React.Fragment>
    );
  } else if (claim) {
    return (
      <React.Fragment>
        <div className="text-center mt-4">
          <h4>Your Result</h4>
          <DisplayCard
            height={96}
            link={claim.img}
            text={claim.name}/>
          <p className="mt-4">Next claim available in {getHoursRemaining(claim.timeOfReset.toDate())} | <Link to="/collection">View Collection</Link></p>
        </div>
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