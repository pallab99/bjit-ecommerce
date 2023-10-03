import Api from "./apiConfigs";

class AuthApi {
  endPoints = {
    cartByUser: "/cart/cartByUser",
    addItemToCart: "/cart/create",
    updateBookQuantity: "/cart/update",
  };
  async cartByUser() {
    return await Api.http.get(this.endPoints.cartByUser);
  }
  async increaseCartItemsByOne(bookId) {
    const data = {
      book: bookId,
      quantity: 1,
    };
    return await Api.http.post(this.endPoints.addItemToCart, data);
  }

  async decreaseCartItemsByOne(bookId) {
    const data = {
      book: bookId,
      quantity: 1,
    };
    return await Api.http.patch(this.endPoints.updateBookQuantity, data);
  }
}

export default new AuthApi();
