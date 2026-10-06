import React from "react";

export const themes = {
  light: {
    backgroundColor: "white",
    textColor: "black"
  },
  dark: {
    backgroundColor: "black",
    textColor: "white"
  }
}

export const ThemeContext = React.createContext();