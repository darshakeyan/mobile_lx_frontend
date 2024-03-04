import { produce } from "immer";
import { SET_MOVIE_ID_FROM_VIEW_PORT } from "./constants";

export const initialState: any = {
  movieId: "",
};

export const appReducers = (state = initialState, action: any) =>
  produce(state, (draftState: any) => {
    switch (action.type) {
      case SET_MOVIE_ID_FROM_VIEW_PORT:
        draftState.movieId = action.movieId;
        break;
    }
  });
