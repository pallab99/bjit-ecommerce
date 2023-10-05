export const ALL_CART_ITEMS = (cartData) => {
  return {
    type: "ALL_CART_ITEMS",
    payload: cartData,
  };
};

export const ACTUAL_PRICE = (actualPrice) => {
  console.log("redux action");
  return {
    type: "ACTUAL_PRICE",
    payload: actualPrice,
  };
};
export const DISCOUNTED_PRICE = (discountedPrice) => {
  console.log("redux action");
  return {
    type: "DISCOUNTED_PRICE",
    payload: discountedPrice,
  };
};
