import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { ActivityIndicator } from "react-native";
import AppStack from "./AppStack";
import { Colors } from "../utils/colors";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppNav = () => {
  const userInfo = useSelector((state: any) => state.auth);
  return (
    <NavigationContainer>
      {userInfo.userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
