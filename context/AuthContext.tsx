import React, { createContext } from "react";

const initialValue = {};

export const AuthContext = createContext(initialValue);

export const AuthProvider = ({ children }: any) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
