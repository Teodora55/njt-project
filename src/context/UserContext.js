import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, login, setLogin }}>
      {children}
    </UserContext.Provider>
  );
};
