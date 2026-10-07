import React, { useState, useContext } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ThemeContext } from "../context/theme-context";

function RegisterForm(props) {
  const { toggleRegisterForm } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const theme = useContext(ThemeContext);

  const inputStyles = {
    "--input-background": theme.inputBackground,
    "--input-color": theme.inputColor,
    "--input-border": theme.borderColor,
    "--input-placeholder": theme.placeholderColor
  };

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
          <form onSubmit={registerUser} className="mb-4">
            <div className="input-group mb-2">
              <input
                style={inputStyles}
                className="form-control themed-input"
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="input-group mb-2">
              <input
                style={inputStyles}
                className="form-control themed-input"
                type="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            {currentlyVisibleState}
            <button
              type="submit"
              className={theme.backgroundColor === "white" ? "btn btn-primary" : "btn btn-light"}>
                Register
            </button>
          </form>
          <p>or</p>
          <button
            type="button"
            className={theme.backgroundColor === "white" ? "btn btn-primary mt-2" : "btn btn-light mt-2"}
            onClick={toggleRegisterForm}>
              Back to Accounts
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RegisterForm;