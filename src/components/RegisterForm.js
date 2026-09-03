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
      <div id="register-container">
        <h4>Register</h4>
        <form onSubmit={registerUser}>
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
          <button type="submit">Register</button>
        </form>
        {currentlyVisibleState}

        <button type="button" onClick={toggleRegisterForm}>Back to Accounts</button>
      </div>
    </React.Fragment>
  );
}

export default RegisterForm;