import { useEffect, useState } from "react";
import "./index.scss";
import CartApi from "../../api/CartApi";
import BookApi from "../../api/BookApi";
const Index = () => {
  const [book, setBook] = useState(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    getCartByUser();
  }, [count]);

  const getCartByUser = async () => {
    try {
      const response = await CartApi.cartByUser();
      setBook(response?.data?.data?.cartExistsForUser?.books);
    } catch (error) {
      console.log(error.response);
    }
  };
  const increaseQuantity = async (bookId) => {
    try {
      const response = await CartApi.increaseCartItemsByOne(bookId);
      console.log(response?.data);
      setCount((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };
  const decreaseQuantity = async (bookId) => {
    try {
      const response = await CartApi.decreaseCartItemsByOne(bookId);
      console.log(response?.data);
      setCount((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(book);
  return (
    <div className="cart-container">
      {book?.map((ele) => {
        return (
          <div className="book-details-div" key={ele?.book?._id}>
            <img
              src="https://qph.cf2.quoracdn.net/main-qimg-880a65f86b1d5d73a962ee2520459af7-lq"
              alt={ele?.book?.title}
            />
            <div className="book-desc">
              <h3>Title : {ele?.book?.title}</h3>
              <h3>Rating : {ele?.book?.rating}</h3>
            </div>
            <div className="quantity">
              <p onClick={() => increaseQuantity(ele?.book?._id)}>+</p>
              <p>{ele?.quantity}</p>
              <p onClick={() => decreaseQuantity(ele?.book?._id)}>-</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Index;
