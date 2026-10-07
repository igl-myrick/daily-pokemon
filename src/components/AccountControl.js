import React, { useState, useEffect, useContext } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ThemeContext } from "../context/theme-context";

function AccountControl() {
  const [registerFormVisible, setRegisterFormVisible] = useState(false);
  const [loginFormVisible, setLoginFormVisible] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  const theme = useContext(ThemeContext);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    }
  }, []);
    
  const doSignOut = () => {
    return auth.signOut();
  }

  const toggleRegisterForm = () => {
    setRegisterFormVisible(!registerFormVisible);
  }

  const toggleLoginForm = () => {
    setLoginFormVisible(!loginFormVisible);
  }

  const buttonStyles = {
    width: "84px"
  }

  let currentlyVisibleState = null;

  if (registerFormVisible) {
    currentlyVisibleState = <RegisterForm toggleRegisterForm={toggleRegisterForm}/>
  } else if (loginFormVisible) {
    currentlyVisibleState = <LoginForm toggleLoginForm={toggleLoginForm}/>
  } else if (authUser) {
    currentlyVisibleState =
      <div className="text-center pt-4">
        <h4>Manage Your Account</h4>
        <p>Welcome back, {authUser.email}</p>
        <button type="button" className={theme.backgroundColor === "white" ? "btn btn-primary" : "btn btn-light"} onClick={doSignOut}>Log Out</button>
      </div>
  } else {
    currentlyVisibleState =
      <div className="text-center pt-4">
        <h4>Manage Your Account</h4>
        <div className="d-flex justify-content-center">
          <div className="row w-15 pt-4">
            <div className="col">
              <button
                className={theme.backgroundColor === "white" ? "btn btn-primary" : "btn btn-light"}
                type="button"
                onClick={toggleLoginForm}
                style={buttonStyles}>
                  Login
              </button>
            </div>
            <div className="col">
              <p>or</p>
            </div>
            <div className="col">
              <button
                className={theme.backgroundColor === "white" ? "btn btn-primary" : "btn btn-light"}
                type="button"
                onClick={toggleRegisterForm}
                style={buttonStyles}>
                  Register
              </button>
            </div>
          </div>
        </div>
      </div>
  }

  return (
    <React.Fragment>
      {currentlyVisibleState}
    </React.Fragment>
  );
}

export default AccountControl;