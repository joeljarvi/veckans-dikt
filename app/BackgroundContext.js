// app/BackgroundContext.js
import { createContext, useContext, useState } from "react";

export const BackgroundContext = createContext();

export function useBackground() {
  return useContext(BackgroundContext);
}

export function BackgroundProvider({ children }) {
  const [backgroundColor, setBackgroundColor] = useState("rgb(0,0,0)");

  return (
    <BackgroundContext.Provider value={{ backgroundColor, setBackgroundColor }}>
      {children}
    </BackgroundContext.Provider>
  );
}
