import { combineReducers } from "redux";
import cartReducers from "./cart";

const rootReducers = combineReducers({
  cart: cartReducers,
});

export default rootReducers;
