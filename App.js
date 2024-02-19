import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/auth/Login";
import Signup from "./screens/auth/Signup";
import Movies from "./screens/home/Movies";
import { Provider } from "react-redux";
import { PaperProvider } from 'react-native-paper';

import { store } from "./store";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Movies"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Movies" component={Movies} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
