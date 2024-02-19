// action will tell you what you want to do with data

// E.X -> action - Remove the item from an Cart
// -> reducer - will remove it (logical thinker) on data
// store - Updated data done by reducer

import { ADD_TO_CARD } from "./constants";

// default value of an data state
const initialState: never[] = [];

export const reducers = (state = initialState, action: { type: any; data: any; }) => {
  switch (action.type) {
    case ADD_TO_CARD:
      return [...state, action.data];
    default:
      return state;
  }
};


// now the data which get in saga will do something here to store in state....

// now it must be accessable through useSelector hook