import React, { createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IContextType {}

type UserAuthentication = {
  email: string;
  password: string;
};

const initialValue = {};

export const AuthContext = createContext<IContextType>(initialValue);

export const AuthProvider = ({ children }: any) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
