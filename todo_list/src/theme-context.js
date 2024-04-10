import React from "react";

export const themes = {
    light: {
      color: "#555555",
      background: "#eeeeee",
    },
    dark: {
      color: "#eeeeee",
      background: "#222222",
    },


  };
  export const ThemeContext = React.createContext(themes.light);

