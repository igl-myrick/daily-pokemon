import React from "react";

export const themes = {
  light: {
    backgroundColor: "white",
    textColor: "black",
    inputBackground: "white",
    inputColor: "black",
    borderColor: "lightgray",
    placeholderColor: "gray"
  },
  dark: {
    backgroundColor: "black",
    textColor: "white",
    inputBackground: "#1f1f1f",
    inputColor: "lightgray",
    borderColor: "#4a4a4a",
    placeholderColor: "gray"
  }
}

export const ThemeContext = React.createContext();