import React, { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

function Collection() {
  const [userClaims, setUserClaims] = useState([]);
  const [authUser, setAuthUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser) return;

    async function getUserCollection() {
      try {
        const q = query(
          collection(db, "claims"),
          where("userId", "==", authUser.uid)
        );

        const snap = await getDocs(q);
        const claims = snap.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          img: doc.data().img
        }));

        setUserClaims(claims);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    }

    getUserCollection();
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

  const imgStyle = {
    height: "96px",
    width: "96px"
  }

  if (!authUser) {
    return (
      <React.Fragment>
        <h4>Your Collection</h4>
        <p>Please <Link to="/account">sign in or register</Link> to view your collection.</p>
      </React.Fragment>
    );
  } else if (error) {
    return (
      <React.Fragment>
        <p>There was an error: {error}</p>
      </React.Fragment>
    );
  } else if (loading) {
    const placeholderCount = 4;
    const placeholderCard =
      <div className="col-md-2 mt-4 w-25">
        <h4 className="placeholder-glow">
          <span className="placeholder col-6"/>
        </h4>
        <p className="placeholder-glow">
          <span className="placeholder col-8" style={imgStyle}></span><br/>
          <span className="placeholder col-4"/>
        </p>
      </div>;

    const placeholderDiv = [];
      
    for (let i = 0; i < placeholderCount; i++) {
      placeholderDiv.push(React.cloneElement(placeholderCard, {key: i}));
    }

    return (
      <React.Fragment>
        <h4 className="text-center pt-4">Your Collection</h4>
        <div className="d-flex text-center justify-content-center">
          <h4 className="placeholder-glow">
            <span className="placeholder col-8"/>
          </h4>
          {placeholderDiv}
        </div>
      </React.Fragment>
    );
  } else if (userClaims.length > 0) {
    return (
      <React.Fragment>
        <div className="container text-center pt-4">
          <h4>Your Collection</h4>
          <div className="row">
            {userClaims.map((claim) => (
              <div className="col-md-1" key={claim.id}>
                <DisplayCard
                  height={96}
                  text={claim.name}
                  link={claim.img}/>
              </div>
            ))} 
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h4>Your Collection</h4>
        <p>Nothing yet!</p>
      </React.Fragment>
    );
  }
}

export default Collection;