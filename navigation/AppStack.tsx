import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Movies from "../screens/home/Movies";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Movies" component={Movies} />
    </Stack.Navigator>
  );
};

export default AppStack;
