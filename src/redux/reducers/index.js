import { combineReducers } from "redux";
import cartSlice from "./../slices/cartSlice";
// import userReducers from "./user";

const rootReducers = combineReducers({
  cart: cartSlice,
  // user: userReducers,
});

export default rootReducers;
