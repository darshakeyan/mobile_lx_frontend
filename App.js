import { Provider } from "react-redux";
import AppNav from "./navigation/AppNav";
import { store } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 60 * 60 * 1000, // Cache for 1 hour
    },
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppNav />
      </QueryClientProvider>
    </Provider>
  );
}
