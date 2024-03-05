import { Provider } from "react-redux";
import AppNav from "./navigation/AppNav";
import { store } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AutocompleteDropdownContextProvider>
          <AppNav />
        </AutocompleteDropdownContextProvider>
      </QueryClientProvider>
    </Provider>
  );
}
