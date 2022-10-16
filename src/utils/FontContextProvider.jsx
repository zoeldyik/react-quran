import { createContext, useEffect, useState } from "react";

export const FONT_DEFAULT_VALUE = {
  lineHeightArab: 40,
  arab: 24,
  latin: 16,
};

export const TeksContext = createContext();

export default function FontContextProvider({ children }) {
  const [font, setFont] = useState(FONT_DEFAULT_VALUE);

  useEffect(() => {
    if (window.localStorage.getItem("fontSize")) {
      setFont(JSON.parse(window.localStorage.getItem("fontSize")));
    }
  }, []);

  return (
    <TeksContext.Provider value={{ font, setFont }}>
      {children}
    </TeksContext.Provider>
  );
}
