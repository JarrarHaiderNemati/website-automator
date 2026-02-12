import { createContext, useState } from "react";

export const CreatorContext = createContext();

export function CreatorProvider({ children }) {
  const [creatingSite, setCreatingSite] = useState(false);

  return (
    <CreatorContext.Provider value={{ creatingSite, setCreatingSite }}>
      {children}
    </CreatorContext.Provider>
  );
}
