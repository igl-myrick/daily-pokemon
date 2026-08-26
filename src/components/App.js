import React from "react";
import Header from "./Header";
import Home from "./Home";
import Game from "./Game";
import Collection from "./Collection";
import Account from "./Account";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="game" element={<Game/>}/>
          <Route path="collection" element={<Collection/>}/>
          <Route path="account" element={<Account/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;