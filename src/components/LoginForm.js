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
      <div className="row d-flex justify-content-center">
        <div className="text-center mt-4 col-md-4">
          <h4>Log In</h4>
          <form onSubmit={logUserIn}>
            <div className="input-group mb-2">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="input-group mb-2">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary">Log in</button>
          </form>
          {currentlyVisibleState}

          <button type="button" className="btn btn-outline-secondary mt-4" onClick={toggleLoginForm}>Back to Accounts</button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LoginForm;