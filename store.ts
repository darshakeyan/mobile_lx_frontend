import { configureStore } from "@reduxjs/toolkit";

import combinedReducer from "./redux/combinedReducer";
import createSagaMiddleware from "redux-saga";
import mySaga from "./redux/saga";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware), // mount it on the store
});

// run the saga
sagaMiddleware.run(mySaga);
