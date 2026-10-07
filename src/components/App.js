import React, { useState } from "react";
import Header from "./Header";
import Home from "./Home";
import Game from "./Game";
import Collection from "./Collection";
import AccountControl from "./AccountControl";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeContext, themes } from "../context/theme-context";

function App() {
  const [theme, setTheme] = useState(themes.dark);

  document.body.style.backgroundColor = theme.backgroundColor;
  document.body.style.color = theme.textColor;

  const toggleTheme = () => {
    setTheme(theme => 
      theme.textColor === "white" ? themes.light : themes.dark
    );
  }

  return (
    <ThemeContext.Provider value={theme}>
      <Router>
        <Header toggleTheme={toggleTheme} theme={theme}/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="game" element={<Game/>}/>
            <Route path="collection" element={<Collection/>}/>
            <Route path="account" element={<AccountControl/>}/>
          </Routes>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;