import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userAuthCheck } from "../redux/actions";
import NetworkStatus from "../components/Network";
import Toast from "react-native-toast-message";

const AppNav = () => {
  const { userToken } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const isAlreadyLoggedIn = async () => {
    const token = await AsyncStorage.getItem("token");
    dispatch(userAuthCheck(token));
  };

  useEffect(() => {
    isAlreadyLoggedIn();
  }, []);

  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
