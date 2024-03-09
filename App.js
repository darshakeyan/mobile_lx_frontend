import React, {useEffect} from 'react'; 
import { Provider } from "react-redux";
import AppNav from "./navigation/AppNav";
import { store } from "./store";
import NetInfo from "@react-native-community/netinfo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 60 * 60 * 1000, // Cache for 1 hour
    },
  },
});

export default function App() {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      state.isConnected
        ? Toast.show({
            type: "success",
            text1: "Online",
            text2: "You are now in online mode👋",
          })
        : Toast.show({
            type: "error",
            text1: "Offile",
            text2: "Sorry, You are now in Offline mode 👋",
          });
    });
    return () => unsubscribe();
  }, []);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppNav />
      </QueryClientProvider>
    </Provider>
  );
}
