import { Provider } from "react-redux";
import AppNav from "./navigation/AppNav";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <AppNav />
    </Provider>
  );
}
