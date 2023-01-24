import { RETRIEVE_ITEM, CREATE_ITEM } from "../actions/types";

const initialState = [];

function itemReducer(item = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_ITEM:
      return [...item, payload];

    case RETRIEVE_ITEM:
      return payload;

    default:
      return item;
  }
}

export default itemReducer;
