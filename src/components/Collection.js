import React, { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";
import { auth, db } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

function Collection() {
  const [userClaims, setUserClaims] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    if (!authUser) return;

    async function getUserCollection() {
      const q = query(
        collection(db, "claims"), where("userId", "==", auth.currentUser.uid)
      );

      const snap = await getDocs(q);
      const claims = [];
      snap.forEach((doc) => {
        claims.push({
          name: doc.data().name,
          img: doc.data().img
        });
      });

      setUserClaims(claims);
    }

    return () => getUserCollection();
  }, []);

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

  if (!authUser) {
    return (
      <React.Fragment>
        <h4>Your Collection</h4>
        <p>Please <Link to="/account">sign in or register</Link> to view your collection.</p>
      </React.Fragment>
    );
  } else if (userClaims.length > 0) {
    const output = userClaims.map((claim) => {
      <div className="col-md-1">
        <DisplayCard
          height={96}
          text={claim.name}
          link={claim.img}/>
      </div>
    });

    return (
      <React.Fragment>
        <h4>Your Collection</h4>
        <div className="row">
          {output}
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