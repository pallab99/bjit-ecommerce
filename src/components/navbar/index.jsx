/* eslint-disable no-unused-vars */
import "./index.scss";
import SignInButton from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isLoggedIn } from "../../helper/isLoggedIn";
import { useSelector } from "react-redux";
import ProfileIcon from "./../../assets/profile.png";
export default function Index() {
  const data = useSelector((state) => state.cart.items);
  console.log({ data });
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/login");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToCartPage = () => {
    navigate("/cart");
  };
  const [showSignInBtn, setShowSignInBtn] = useState(false);
  useEffect(() => {
    console.log(isLoggedIn());
    if (isLoggedIn()) {
      setShowSignInBtn(true);
    }
  }, []);
  return (
    <div className="nav">
      <div className="nav-container">
        <div className="hover" onClick={navigateToHome}>
          ECommerce{" "}
        </div>
        <div className="right-div">
          <svg
            className="cart-icon"
            width="512"
            height="512"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={navigateToCartPage}
          >
            <path
              fill="currentColor"
              d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1V2m6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5H16Z"
            />
          </svg>
          <span>{data.length}</span>
          <img className="profile-icon" src={ProfileIcon} alt="" />
          {!showSignInBtn && (
            <SignInButton
              className={"sign-in-btn"}
              text="Sign In"
              handleButtonClick={handleButtonClick}
            ></SignInButton>
          )}
        </div>
      </div>
      {/* <Modal
        open={modalVisibility}
        onCancel={openHandleModal}
        bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
        className="cart-modal"
        width={700}
      >
        {!cartItems.length ? (
          <h2 style={{ textAlign: "center" }}>No items in cart</h2>
        ) : (
          <div>
            {cartItems.map((ele, index) => {
              return (
                <div className="cart-div" key={index}>
                  <div className="img-div">
                    <img className="cart-img" src={ele.images[0]} alt="" />
                  </div>
                  <div className="description-div">
                    <p>Title: {ele.title}</p>
                    <p>Price: {ele.price}</p>
                    <p>Rating : {ele.rating}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {!cartItems.length ? null : (
          <p className="total-price">Total : ${calculateTotalPrice}</p>
        )}
        {!cartItems.length ? null : (
          <div className="clear-btn-div">
            <Button
              className={"remove-cart"}
              text={"clear cart"}
              handleButtonClick={removeCart}
            ></Button>
          </div>
        )}
      </Modal> */}
    </div>
  );
}
