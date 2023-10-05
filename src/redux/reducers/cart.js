// import { ALL_CART_ITEMS } from "../actions/cart";

const initialState = {
  items: [],
  actualPrice: 0,
  discountedPrice: 0,
};

function cartReducers(state = initialState, action) {
  switch (action.type) {
    case "ALL_CART_ITEMS":
      return { ...state, items: action.payload };
    case "ACTUAL_PRICE":
      return { ...state, actualPrice: action.payload };
    case "DISCOUNTED_PRICE":
      return { ...state, discountedPrice: action.payload };
    default:
      return state;
  }
}
export default cartReducers;
