import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function RegisterForm(props) {
  const { toggleRegisterForm } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const registerUser = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(toggleRegisterForm)
      .catch((error) => {
        setError(error);
      });
  }

  let currentlyVisibleState = null;

  if (error) {
    currentlyVisibleState = <p>There was an error: {error.message}</p>
  }

  return (
    <React.Fragment>
      <div className="row d-flex justify-content-center">
        <div className="text-center mt-4 col-md-4" id="register-container">
          <h4>Register</h4>
          <form onSubmit={registerUser}>
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
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
          {currentlyVisibleState}

          <button type="button" className="btn btn-outline-secondary mt-4" onClick={toggleRegisterForm}>Back to Accounts</button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RegisterForm;