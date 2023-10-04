/* eslint-disable no-unused-vars */
import "./index.scss";
import SignInButton from "../../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isLoggedIn } from "../../../../helper/isLoggedIn";

export default function Navbar() {
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
          {/* <span>{cartItems.length}</span> */}
          {!showSignInBtn && (
            <SignInButton
              className={"sign-in-btn"}
              text="Sign In"
              handleButtonClick={handleButtonClick}
            ></SignInButton>
          )}
        </div>
      </div>
    </div>
  );
}
