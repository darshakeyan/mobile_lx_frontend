import { produce } from "immer";
import { SET_MOVIE_ID_FROM_VIEW_PORT, SET_SORTBY_VALUE } from "./constants";

export const initialState: any = {
  movieId: "",
  sortByValue: "",
};

export const appReducers = (state = initialState, action: any) =>
  produce(state, (draftState: any) => {
    switch (action.type) {
      case SET_MOVIE_ID_FROM_VIEW_PORT:
        draftState.movieId = action.movieId;
        break;
      case SET_SORTBY_VALUE:
        draftState.sortByValue = action.value;
    }
  });
