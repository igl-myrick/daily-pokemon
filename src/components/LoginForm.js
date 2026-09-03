import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginForm(props) {
  const { toggleLoginForm } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const logUserIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => toggleLoginForm())
      .catch((error) => {
        setError(error)
      });
  }

  let currentlyVisibleState = null;

  if (error) {
    currentlyVisibleState = <p>There was an error: {error}</p>
  }

  return (
    <React.Fragment>
      <div>
        <h4>Log In</h4>
        <form onSubmit={logUserIn}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit">Log in</button>
        </form>
        {currentlyVisibleState}

        <button type="button" onClick={toggleLoginForm}>Back to Accounts</button>
      </div>
    </React.Fragment>
  );
}

export default LoginForm;