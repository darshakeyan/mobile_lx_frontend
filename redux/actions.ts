import { ADD_TO_CARD } from "./constants";

export const addToCard = (item: any) => {
  return {
    type: ADD_TO_CARD, // identify by reducer
    data: item,
  };
};
