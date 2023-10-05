import { combineReducers } from "redux";
import cartReducers from "./cart";
import userReducers from "./user";

const rootReducers = combineReducers({
  cart: cartReducers,
  user: userReducers,
});

export default rootReducers;
