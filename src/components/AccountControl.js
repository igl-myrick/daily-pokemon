import React, { useState, useEffect } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

function AccountControl() {
  const [registerFormVisible, setRegisterFormVisible] = useState(false);
  const [loginFormVisible, setLoginFormVisible] = useState(false);
  const [authUser, setAuthUser] = useState(null);

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

  let currentlyVisibleState = null;

  if (registerFormVisible) {
    currentlyVisibleState = <RegisterForm toggleRegisterForm={toggleRegisterForm}/>
  } else if (loginFormVisible) {
    currentlyVisibleState = <LoginForm toggleLoginForm={toggleLoginForm}/>
  } else if (authUser) {
    currentlyVisibleState =
      <div>
        <h4>Manage Your Account</h4>
        <p>Welcome back, {authUser.email}</p>
        <button type="button" onClick={doSignOut}>Log Out</button>
      </div>
  } else {
    currentlyVisibleState =
      <div>
        <h4>Manage Your Account</h4>
        <button type="button" onClick={toggleLoginForm}>Login</button>
        <button type="button" onClick={toggleRegisterForm}>Register</button>
      </div>
  }

  return (
    <React.Fragment>
      {currentlyVisibleState}
    </React.Fragment>
  );
}

export default AccountControl;