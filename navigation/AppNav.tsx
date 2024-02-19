import React, { useContext } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { AuthContext } from "../context/AuthContext";
import { ActivityIndicator } from "react-native";
import AppStack from "./AppStack";
import { Colors } from "../utils/colors";

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.primaryBg,
        }}
      >
        <ActivityIndicator size={"large"} color={"white"} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {userToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
