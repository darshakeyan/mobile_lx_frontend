import { Provider } from "react-redux";
import { AuthProvider } from "./context/AuthContext";
import AppNav from "./navigation/AppNav";
import { store } from "./store";

export default function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
          <AppNav />
      </Provider>
    </AuthProvider>
  );
}
