import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  actualPrice: 0,
  discountedPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setAllCartItems: (state, action) => {
      console.log("ssss", action.payload);
      state.items = action.payload;
    },
    setActualPrice: (state, action) => {
      state.actualPrice = action.payload;
    },
    setDiscountedPrice: (state, action) => {
      state.discountedPrice = action.payload;
    },
  },
});

export const { setAllCartItems, setActualPrice, setDiscountedPrice } =
  cartSlice.actions;

export default cartSlice.reducer;
