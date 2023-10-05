/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./cart.style.scss";
import CartApi from "../../../../api/CartApi";
import Button from "../../../../components/ui/button";
import Navbar from "../../../../components/navbar";
import Loader from "../../../../components/atoms/loader";
import { useDispatch, useSelector } from "react-redux";
import {
  ACTUAL_PRICE,
  ALL_CART_ITEMS,
  DISCOUNTED_PRICE,
} from "../../../../redux/actions/cart";
const Cart = () => {
  const data = useSelector((state) => state.cart.items);
  const actualPrice = useSelector((state) => state.cart.actualPrice);
  const discountedPrice = useSelector((state) => state.cart.discountedPrice);
  const dispatch = useDispatch();
  console.log("redux state", data);
  const [book, setBook] = useState(null);
  const [count, setCount] = useState(0);
  // const [actualPrice, setActualPrice] = useState();
  // const [discountedPrice, setDiscountedPrice] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getCartByUser();
  }, [count]);

  const getCartByUser = async () => {
    try {
      setIsLoading(true);
      const response = await CartApi.cartByUser();
      // setBook(response?.data?.data?.cartExistsForUser?.books);
      dispatch(ALL_CART_ITEMS(response?.data?.data?.cartExistsForUser?.books));
      dispatch(ACTUAL_PRICE(response?.data?.data?.beforeDiscount));
      dispatch(DISCOUNTED_PRICE(response?.data?.data?.afterDiscount));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
    console.log("decrease", bookId);
    try {
      const response = await CartApi.decreaseCartItemsByOne(bookId);
      setCount((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(book);
  return (
    <>
      <Navbar></Navbar>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="cart-container">
          <div className="main-cart-items">
            {data?.map((ele) => {
              return (
                <div className="cart-div" key={ele?.book?._id}>
                  <div className="book-details-div">
                    <img
                      src="https://qph.cf2.quoracdn.net/main-qimg-880a65f86b1d5d73a962ee2520459af7-lq"
                      alt={ele?.book?.title}
                    />
                    <div className="book-desc">
                      <h3>Title : {ele?.book?.title}</h3>
                      <h3>Rating : {ele?.book?.rating}</h3>
                      <h3>Price : {ele?.book?.price}</h3>
                    </div>
                    <div className="quantity">
                      <Button
                        className={"counter-btn"}
                        text={"+"}
                        handleButtonClick={() =>
                          increaseQuantity(ele?.book?._id)
                        }
                      >
                        +
                      </Button>
                      <p>{ele?.quantity}</p>
                      <Button
                        className={"counter-btn"}
                        text={"-"}
                        handleButtonClick={() =>
                          decreaseQuantity(ele?.book?._id)
                        }
                      >
                        -
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="price-div">
            <h3>Actual Price: ${actualPrice}</h3>
            <h3>Price After Discount: ${discountedPrice}</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
