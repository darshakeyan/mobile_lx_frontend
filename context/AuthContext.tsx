import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../utils/api";

interface IContextType {
  signin: (credential: UserAuthentication) => void;
  logout: () => void;
  isLoading: boolean;
  userToken: string;
}

type UserAuthentication = {
  email: string;
  password: string;
};

const initialValue = {
  signin: () => {},
  logout: () => {},
  isLoading: false,
  userToken: "",
};

export const AuthContext = createContext<IContextType>(initialValue);

export const AuthProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState<any>("");
  const [userInfo, setUserInfo] = useState<any>(null);

  const signin = ({ email, password }: UserAuthentication) => {
    setIsLoading(false);
    axios
      .post(`${BASE_URL}/login`, {
        email,
        password,
      })
      .then((res) => {
        setUserInfo(res.data);
        console.log(userInfo?.token);
        setUserToken(userInfo?.token);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        AsyncStorage.setItem("userToken", userInfo?.token);
      })
      .catch((e) => console.log("Error Login", e));
  };

  const logout = () => {
    setIsLoading(false);
    setUserToken("");
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const userInfo = await AsyncStorage.getItem("userInfo");
      const userToken = await AsyncStorage.getItem("userToken");
      if (userInfo) {
        setUserInfo(userInfo);
        setUserToken(userToken);
      }
      setUserToken(userToken);
      setIsLoading(false);
    } catch (error) {
      console.log(`isLoggedIn Error`, error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading, userToken, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
